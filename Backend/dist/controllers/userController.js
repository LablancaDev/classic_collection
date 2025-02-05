var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/User.js";
export const registerDataUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Se extraen los datos del cuerpo de la solicitud
    const { userName, password, email } = req.body;
    console.log('Datos a Instertar:', userName, password, email);
    try {
        if (!userName || !password || !email) {
            res.status(400).json({ message: 'Tiene que rellenar todos los campos para el registro' });
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            res.status(400).json({ message: "El formato del email no es válido" });
            return;
        }
        if (password.length < 6) {
            res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
            return;
        }
        // Crear un nuevo usuario con los datos recibidos
        // Se pasan los datos (name, email, password, profile_image) al constructor del modelo con los datos que vienen de la solicitud, creando una instancia de User.
        const newUser = new User({
            userName,
            email,
            password,
        });
        yield newUser.save(); // El usuario recién creado se guarda en la base de datos MongoDB usando el método save(). Mongoose convierte ese objeto en un documento que se guarda en MongoDB.
        // MongoDB asignará automáticamente un ID único a este nuevo registro, y los datos serán almacenados.
        // Si todo funciona bien, se responde con un código HTTP 201 (Created) y un mensaje de éxito. También se devuelve el usuario recién creado.
        res.status(201).json({
            message: 'User registered successfully',
            user: newUser,
        });
    }
    catch (error) {
        console.error('Error registrando el usuario:', error);
        res.status(500).json({ message: 'Error registrando el usuario' });
    }
});
// Login de usuario
export const loginDataUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log('Email y password para el login', email, password);
        // Búsqueda del usuario por email
        const user = yield User.findOne({ email });
        if (!user) {
            res.status(401).json({ message: 'Email o contraseña incorrectos' });
            return; // Detener ejecución
        }
        // Validación de la contraseña
        if (user.password !== password) {
            // El email es correcto, pero la contraseña es incorrecta
            res.status(401).json({ message: 'Contraseña incorrecta' });
            return; // Detener ejecución
        }
        // 🟢 Asegurarse de que el _id esté presente antes de enviarlo
        console.log('User found:', user);
        // Validación del password          _id: (barra baja) indica que es el identificador único de MongoDB.por lo tanto en cualquier archivo debe coincidir siempre igual en el backend y frontend.
        if (user.password === password) {
            res.status(200).json({
                message: 'Login exitoso',
                userId: user._id,
                userName: user.userName,
                email: user.email,
            });
            return;
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error durante el login", error });
    }
});
