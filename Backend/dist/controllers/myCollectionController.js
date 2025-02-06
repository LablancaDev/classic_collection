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
    const { name, user_id, platform, coverUrl } = req.body; // Incluimos `platform`
    // Aseguramos que todos los campos necesarios estén presentes
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
        // Verificar si el juego ya está en la colección del usuario
        const gameExists = user.myCollection.some((game) => game.name === name);
        if (gameExists) {
            res.status(400).json({ message: "Game already in collection." });
            return;
        }
        // Agregar el juego a la colección del usuario con la propiedad `platform`
        user.myCollection.push({ name, platform, coverUrl, dateAdded: new Date() });
        yield user.save();
        res.status(201).json({ message: "Game added to collection!" });
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
