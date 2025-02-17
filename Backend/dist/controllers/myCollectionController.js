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
// 📌 Agregar un juego a la colección del usuario
export const addSelectGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, user_id, platform, coverUrl, summary, rating } = req.body;
    // Validar que los campos requeridos están presentes
    if (!name || !user_id || !platform) {
        res.status(400).json({ message: "Game name, user ID, and platform are required." });
        return;
    }
    try {
        // Buscar al usuario en la base de datos
        const user = yield User.findById(user_id);
        if (!user) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        // Verificar si el juego ya está en la colección del usuario (misma plataforma)
        const gameExists = user.myCollection.some((game) => game.name === name && game.platform === platform);
        if (gameExists) {
            res.status(400).json({ message: "Game already in collection for this platform." });
            return;
        }
        // Crear objeto del juego
        const newGame = {
            name,
            platform,
            coverUrl,
            summary,
            rating,
            dateAdded: new Date(),
        };
        // Agregar el juego a la colección del usuario
        user.myCollection.push(newGame);
        yield user.save();
        res.status(201).json({ message: "Game added to collection!", game: newGame });
    }
    catch (error) {
        console.error("Error adding game to collection:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});
/* La función getDataCollection que hará lo siguiente:

Buscará el usuario por su user_id.
Recuperará la colección de juegos (es decir, el array myCollection).
Devolverá la colección de juegos al cliente.*/
// Función para obtener la colección de juegos de un usuario
export const getDataCollection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const user = yield User.findById(user_id);
        // Verifica si el usuario existe
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }
        // Devuelve la colección de juegos del usuario
        res.status(200).json(user.myCollection);
    }
    catch (error) {
        console.error('Error fetching user collection:', error);
        res.status(500).json({ message: 'An error occurred while retrieving the collection.' });
    }
});
// Función para eliminar un juego de la colección de un usuario
export const removeGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, user_id } = req.body; // Obtenemos el nombre del juego y el ID del usuario desde el cuerpo de la solicitud.
    // Verificar que ambos parámetros están presentes
    if (!name || !user_id) {
        res.status(400).json({ message: "Game name and user_id are required." });
        return;
    }
    try {
        // Buscar al usuario en la base de datos
        const user = yield User.findById(user_id);
        if (!user) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        // Buscar el índice del juego en la colección del usuario
        const gameIndex = user.myCollection.findIndex((game) => game.name === name);
        // Si el juego no se encuentra en la colección
        if (gameIndex === -1) {
            res.status(404).json({ message: "Game not found in user's collection." });
            return;
        }
        // Eliminar el juego de la colección
        user.myCollection.splice(gameIndex, 1); // Elimina el juego en la posición del índice encontrado
        yield user.save(); // Guardamos los cambios en la base de datos
        res.status(200).json({ message: "Game removed from collection." });
    }
    catch (error) {
        console.error("Error removing game:", error);
        res.status(500).json({ message: "An error occurred while removing the game." });
    }
});
