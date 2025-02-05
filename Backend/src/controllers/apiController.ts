// controllers/gameController.ts

import { Request, Response } from "express";
import { fetchGameCovers } from "../data/apiConexion.js";

export const getDataGames = async (req: Request, res: Response) => {
  try {
    const platform = req.query.platform as string | undefined; // Tomar plataforma de los query params
    const games = await fetchGameCovers(platform);
    res.json(games);
  } catch (error) {
    console.error("Error fetching game covers:", error);
    res.status(500).json({ message: "Error al obtener datos de juegos." });
  }
};


