import mongoose, { Schema, Document } from "mongoose";

// Interfaz para los juegos dentro de la colección del usuario
interface IGame {
  name: string;
  coverUrl?: string;  // URL de la portada del juego 
  platform: string;   // Plataforma del juego 
  summary?: string; // Descripción del juego 
  rating?: number;  // Puntuación del juego 
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
      coverUrl: { type: String }, 
      platform: { type: String, required: true },  
      summary: { type: String },  
      rating: { type: Number },  
      dateAdded: { type: Date, default: Date.now },  
    },
  ],
});

// Modelo
const User = mongoose.model<IUser>("User", userSchema);

export default User;

/*El modelo User tiene un array llamado myCollection que contiene objetos con los juegos agregados por el usuario, 
cada uno con su nombre y la fecha en que se añadió.*/ 
