import mongoose from "mongoose";
// Esquema de Mongoose
const userSchema = new mongoose.Schema({
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
const User = mongoose.model("User", userSchema);
export default User;
