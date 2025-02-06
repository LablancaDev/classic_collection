import { Request, Response } from "express";
import User, { IUser } from "../models/User.js"; // Importamos el modelo y la interfaz


export const addSelectGame = async (req: Request, res: Response): Promise<void> => {
  const { name, user_id, platform, coverUrl  } = req.body; // Incluimos `platform`

  // Aseguramos que todos los campos necesarios estén presentes
  if (!name || !user_id || !platform) {
    res.status(400).json({ message: "Game name, user ID, and platform are required." });
    return;
  }

  try {
    // Buscar al usuario en la base de datos
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

    // Agregar el juego a la colección del usuario con la propiedad `platform`
    user.myCollection.push({ name, platform, coverUrl, dateAdded: new Date() });
    await user.save();

    res.status(201).json({ message: "Game added to collection!" });
  } catch (error) {
    console.error("Error adding game to collection:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


/* La función getDataCollection que hará lo siguiente:

Buscará el usuario por su user_id.
Recuperará la colección de juegos (es decir, el array myCollection).
Devolverá la colección de juegos al cliente.*/ 

// Función para obtener la colección de juegos de un usuario
export const getDataCollection = async (req: Request, res: Response): Promise<void> => {
  // Extrae el user_id de la cadena de consulta.
  // const { user_id } = req.body;  esperando los parámetros del cuerpo de la solicitud (req.body)
  const { user_id } = req.query; // en las URL, los parámetros se pasan a través de la cadena de consulta (req.query).

  // Verifica si el user_id está presente
  if (!user_id) {
    res.status(400).json({ message: 'User ID is required.' });
    return;
  }

  try {
    // Buscar al usuario en la base de datos por el user_id
    const user = await User.findById(user_id);

    // Verifica si el usuario existe
    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    // Devuelve la colección de juegos del usuario
    res.status(200).json(user.myCollection);
  } catch (error) {
    console.error('Error fetching user collection:', error);
    res.status(500).json({ message: 'An error occurred while retrieving the collection.' });
  }
};
