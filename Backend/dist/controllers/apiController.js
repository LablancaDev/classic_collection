var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchGameCovers } from "../data/apiConexion.js";
import { fetchAPIrawg, fetchAPIrawgPrueba } from "../data/apiConexionRAWG.js";
import { fetchAPITheGamesDb } from "../data/apiConexionTheGamesDb.js";
// Consumo API igdb
export const getDataGames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const platform = req.query.platform; // Tomar plataforma de los query params
        const games = yield fetchGameCovers(platform);
        res.json(games);
    }
    catch (error) {
        console.error("Error fetching game covers API igdb:", error);
        res.status(500).json({ message: "Error al obtener datos de juegos." });
    }
});
// Consumo API rawg endpoint Developments, obtiene las desarrolladoras
export const getDataDevelopers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { endpoint } = req.params; // Obtiene el endpoint desde la URL  
        if (!endpoint) {
            res.status(400).json({ message: "Falta el endpoint en la solicitud." });
            return;
        }
        console.log(`🔍 Endpoint recibido en el backend: ${endpoint}`); // Imprime el endpoint en la consola del servidor
        const data = yield fetchAPIrawg(endpoint);
        if (!data) {
            res.status(500).json({ message: "Error al obtener datos de RAWG API." });
            return;
        }
        res.json(data);
    }
    catch (error) {
        console.error("Error fetching data API rawg:", error);
        res.status(500).json({ message: "Error al obtener datos." });
    }
});
// 🔥Controller de Prueba, obtiene las screenshoots
export const getDataScreenShoots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fetchAPIrawgPrueba();
        if (!data) {
            res.status(500).json({ message: "Error al obtener datos de RAWG API." });
            return;
        }
        res.json(data);
    }
    catch (error) {
        console.error("Error fetching data API rawg:", error);
        res.status(500).json({ message: "Error al obtener datos." });
    }
});
// Consumo API TheGamesDb (portadas buenas)
export const getDataTheGamesDb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fetchAPITheGamesDb();
        if (!data || !data.data || !data.data.games) {
            console.error("Error: Respuesta inválida de la API", data);
            res.status(500).json({ message: "Error al obtener datos de TheGamesDB." });
            return;
        }
        console.log("✅ Datos recibidos en el backend:", data.data.games);
        res.json(data.data.games);
    }
    catch (error) {
        console.error("❌ Error en getDataTheGamesDb:", error);
        res.status(500).json({ message: "Error al obtener datos." });
    }
});
