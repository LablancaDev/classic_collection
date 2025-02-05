var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/User.js"; // Importamos el modelo y la interfaz
export const addSelectGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, user_id } = req.body;
    if (!name || !user_id) {
        res.status(400).json({ message: "Game name and user ID are required." });
        return;
    }
    try {
        const user = yield User.findById(user_id);
        if (!user) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        // Verificar si el juego ya está en la colección del usuario
        const gameExists = user.myCollection.some((game) => game.name === name);
        if (gameExists) {
            res.status(400).json({ message: "Game already in collection." });
            return;
        }
        // Agregar el juego a la colección del usuario
        user.myCollection.push({ name, dateAdded: new Date() });
        yield user.save();
        res.status(201).json({ message: "Game added to collection!" });
    }
    catch (error) {
        console.error("Error adding game to collection:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});
