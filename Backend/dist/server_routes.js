import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getDataDevelopers, getDataGames, getDataScreenShoots, getDataTheGamesDb } from './controllers/apiController.js';
import { addSelectGame, getDataCollection, removeGame } from './controllers/myCollectionController.js';
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
// * Ruta para el consumo de la api desde el servidor ya que esta API no permite realizar peticiones directas desde el navegador debido a CORS. (igdb)
router.get('/dataGames', getDataGames);
// * Rutas para el consumo de la api desde el servidor express (rawg)
router.get('/data_rawg/:endpoint', getDataDevelopers);
// 🔥 Ruta prueba para el consumo de la api desde el servidor express (rawg)
router.get('/data_rawg', getDataScreenShoots);
// Ruta para obtener datos de la api TheGameDb 
router.get('/data_TheGamesDb', getDataTheGamesDb);
// * Ruta para Registrar usuarios en la base de datos Mongo Atlas  
router.post('/userRegister', registerDataUser);
// * Ruta para Logear usuarios en la base de datos Mongo Atlas
router.post('/userLogin', loginDataUser);
// * Ruta para almacenar los nombres de los videojuegos seleccionados para la colección
router.post('/selectGame', addSelectGame);
// * Ruta para recuperar los juegos de la colección de cada usuario
router.get('/myCollection', getDataCollection);
// * Ruta para eliminar los juegos de la colección de cada usuario(para drag and drop)
router.delete('/removeGame', removeGame);
export default router;
