// controllers/gameController.ts
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
export const getDataGames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const platform = req.query.platform; // Tomar plataforma de los query params
        const games = yield fetchGameCovers(platform);
        res.json(games);
    }
    catch (error) {
        console.error("Error fetching game covers:", error);
        res.status(500).json({ message: "Error al obtener datos de juegos." });
    }
});
