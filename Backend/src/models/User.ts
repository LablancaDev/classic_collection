import mongoose, { Schema, Document } from "mongoose";

// Interfaz para los juegos dentro de la colección del usuario
interface IGame {
  name: string;
  dateAdded: Date;
}

// Interfaz para el usuario
export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  myCollection: IGame[]; // Se añade la colección de juegos
}

// Esquema de Mongoose
const userSchema = new mongoose.Schema<IUser>({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  myCollection: [
    {
      name: { type: String, required: true },
      dateAdded: { type: Date, default: Date.now },
    },
  ],
});

// Modelo
const User = mongoose.model<IUser>("User", userSchema);

export default User;
