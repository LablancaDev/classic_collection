import mongoose from "mongoose";
// Esquema de Mongoose
const userSchema = new mongoose.Schema({
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
const User = mongoose.model("User", userSchema);
export default User;
/*El modelo User tiene un array llamado myCollection que contiene objetos con los juegos agregados por el usuario,
cada uno con su nombre y la fecha en que se añadió.*/
