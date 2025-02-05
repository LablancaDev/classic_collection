import mongoose, { Schema } from "mongoose";
// Esquema de Mongoose
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
// Modelo
const User = mongoose.model("User", UserSchema);
export default User;
