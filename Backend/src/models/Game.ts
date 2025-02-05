import mongoose, { Schema, Document } from "mongoose";

// Interfaz para los juegos en la base de datos
export interface IGame extends Document {
  name: string;
  platform: string;
  coverUrl?: string;
}

// Esquema de juegos
const gameSchema = new Schema<IGame>({
  name: { type: String, required: true },
  platform: { type: String, required: true },
  coverUrl: { type: String }, // URL opcional para la portada del juego
});

// Modelo
const Game = mongoose.model<IGame>("Game", gameSchema);

export default Game;
