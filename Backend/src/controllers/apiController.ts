import { Request, Response } from "express";
import { fetchGameCovers } from "../data/apiConexion.js";
import { fetchAPIrawg, fetchAPIrawgPrueba } from "../data/apiConexionRAWG.js";
import { fetchAPITheGamesDb } from "../data/apiConexionTheGamesDb.js";

// Consumo API igdb
export const getDataGames = async (req: Request, res: Response) => {
  try {
    const platform = req.query.platform as string | undefined; // Tomar plataforma de los query params
    const games = await fetchGameCovers(platform);
    res.json(games);
  } catch (error) {
    console.error("Error fetching game covers API igdb:", error);
    res.status(500).json({ message: "Error al obtener datos de juegos." });
  }
};

// Consumo API rawg endpoint Developments, obtiene las desarrolladoras
export const getDataDevelopers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { endpoint } = req.params; // Obtiene el endpoint desde la URL  

    if (!endpoint) {
      res.status(400).json({ message: "Falta el endpoint en la solicitud." });
      return;
    }

    console.log(`🔍 Endpoint recibido en el backend: ${endpoint}`); // Imprime el endpoint en la consola del servidor

    const data = await fetchAPIrawg(endpoint);

    if (!data) {
      res.status(500).json({ message: "Error al obtener datos de RAWG API." });
      return
    }

    res.json(data)

  } catch (error) {
    console.error("Error fetching data API rawg:", error);
    res.status(500).json({ message: "Error al obtener datos." });
  }
}


// 🔥Controller de Prueba, obtiene las screenshoots
export const getDataScreenShoots = async (req: Request, res: Response): Promise<void> => {
  try {
   
    const data = await fetchAPIrawgPrueba();

    if (!data) {
      res.status(500).json({ message: "Error al obtener datos de RAWG API." });
      return
    }

    res.json(data)

  } catch (error) {
    console.error("Error fetching data API rawg:", error);
    res.status(500).json({ message: "Error al obtener datos." });
  }
}

// Consumo API TheGamesDb (portadas buenas)
export const getDataTheGamesDb = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await fetchAPITheGamesDb();

    if (!data || !data.data || !data.data.games) {
      console.error("Error: Respuesta inválida de la API", data);
      res.status(500).json({ message: "Error al obtener datos de TheGamesDB." });
      return;
    }

    console.log("✅ Datos recibidos en el backend:", data.data.games);
    res.json(data.data.games);

  } catch (error) {
    console.error("❌ Error en getDataTheGamesDb:", error);
    res.status(500).json({ message: "Error al obtener datos." });
  }
};





