import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getDataGames } from './controllers/apiController.js';
import { addSelectGame } from './controllers/myCollectionController.js';
import { loginDataUser, registerDataUser } from './controllers/userController.js';
// Simulación de __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();
// // Configuración de almacenamiento para multer
// const storage = multer.diskStorage({
//     destination: path.join(__dirname, '../dist/uploads'), // Guardar imágenes en "uploads" 
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`); // Nombre único para cada archivo 
//     },
// });
// const upload = multer({ storage }); // Middleware para manejo de archivos
// * Ruta para el consumo de la api desde el servidor ya que esta API no permite realizar peticiones directas desde el navegador debido a CORS.
router.get('/dataGames', getDataGames);
// * Ruta para Registrar usuarios en la base de datos Mongo Atlas  
router.post('/userRegister', registerDataUser);
// * Ruta para Logear usuarios en la base de datos Mongo Atlas
router.post('/userLogin', loginDataUser);
// * Ruta para almacenar los nombres de los videojuegos seleccionados para la colección
router.post('/selectGame', addSelectGame);
export default router;
