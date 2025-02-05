import { Request, Response } from "express";
import User, { IUser } from "../models/User.js"; // Importamos el modelo y la interfaz

export const addSelectGame = async (req: Request, res: Response): Promise<void> => {
  const { name, user_id } = req.body;

  if (!name || !user_id) {
    res.status(400).json({ message: "Game name and user ID are required." });
    return;
  }

  try {
    const user: IUser | null = await User.findById(user_id);
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    // Verificar si el juego ya está en la colección del usuario
    const gameExists = user.myCollection.some((game: { name: string }) => game.name === name);
    if (gameExists) {
      res.status(400).json({ message: "Game already in collection." });
      return;
    }

    // Agregar el juego a la colección del usuario
    user.myCollection.push({ name, dateAdded: new Date() });
    await user.save();

    res.status(201).json({ message: "Game added to collection!" });
  } catch (error) {
    console.error("Error adding game to collection:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
