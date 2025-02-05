import mongoose, { Schema } from "mongoose";
// Esquema de juegos
const gameSchema = new Schema({
    name: { type: String, required: true },
    platform: { type: String, required: true },
    coverUrl: { type: String }, // URL opcional para la portada del juego
});
// Modelo
const Game = mongoose.model("Game", gameSchema);
export default Game;
