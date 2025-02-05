import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const testMongoConnection = async () => {
    console.log("🔍 Probando conexión a MongoDB Atlas...");
    console.log("🔗 URL de conexión:", process.env.MONGO_URI ? "✅ Cargada correctamente" : "❌ No encontrada");

    try {
        await mongoose.connect(process.env.MONGO_URI || '');

        console.log("✅ Conexión exitosa a MongoDB Atlas");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error en la conexión:", error.message);
        process.exit(1);
    }
};

testMongoConnection();

// Test inicial de conexión a Mongo, eliminar más adelante, no necesaria...
