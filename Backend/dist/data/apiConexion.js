var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from 'node-fetch';
// Conexión a la api IGDB para datos relacionados con videojuegos
// * Importante: 
/* Esta conexión es de prueba para ver que datos contiene la API  y como se trabaja con ella,
una vez construido el Backend y el servidor express se realizarán las peticiones desde el Backend*/
// *  petición a la API de IGDB: 
/*1. Crear Cuenta de Twitch y Registrar la Aplicación
Crea una cuenta de Twitch: Regístrate en Twitch si aún no tienes una cuenta.
Habilita la autenticación de dos factores para tu cuenta de Twitch.
Registra tu aplicación en el portal de desarrolladores de Twitch.
Genera el secreto de cliente:
Al registrar tu aplicación, obtendrás un Client ID.
Luego, genera un Client Secret.
Estos dos valores serán necesarios para obtener el token de acceso (access_token).

2. Autenticación (Obtener access_token)
Para realizar peticiones a la API de IGDB, necesitas autenticarte con Twitch usando el Client ID y Client Secret que generaste.

Petición para obtener access_token:
Realiza una petición POST a https://id.twitch.tv/oauth2/token con los parámetros client_id, client_secret y grant_type=client_credentials.*/
// * obtener el access_token:
const clientId = '7kz0lz5jdn9zqhn1agxymhszly5478';
const clientSecret = 's6qz9ky7od9wj7ra6ajb1mprqsaz3k';
// Función para obtener el token de acceso de Twitch
function getAccessToken() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://id.twitch.tv/oauth2/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
            });
            // Verificar si la respuesta fue exitosa
            if (!response.ok) {
                throw new Error(`Failed to get access token: ${response.statusText}`);
            }
            const data = (yield response.json());
            return data.access_token;
        }
        catch (error) {
            console.error("Error obteniendo el access token:", error);
            throw error; // Re-lanzamos el error para depuración
        }
    });
}
// Este código te dará un access_token que podrás usar en las solicitudes a la API de IGDB.
// * Petición:
// 3. Realizar una Petición a IGDB para Obtener Portadas de Videojuegos
// Crear una Función para Obtener Portadas
// Con el access_token en mano, puedes realizar una petición POST a la API de IGDB para obtener las portadas.
// Nota: Esta API no permite realizar peticiones directas desde el navegador debido a CORS. Lo ideal es realizar las solicitudes desde un backend o servidor.
// Ejemplo en JavaScript (Node.js):
// Este ejemplo usa node-fetch, que puedes instalar con npm install node-fetch.
// Función para realizar la petición a IGDB y obtener datos de videojuegos
// Función para obtener datos de videojuegos de la API de IGDB
export function fetchGameCovers(platform) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const accessToken = yield getAccessToken();
            const platformFilter = platform ? `where platforms.name = "${platform}";` : '';
            const response = yield fetch('https://api.igdb.com/v4/games', {
                method: 'POST',
                headers: {
                    'Client-ID': clientId,
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: `fields name, cover.url, platforms.name, rating, summary; limit 300; ${platformFilter}`,
            });
            // Comprobación de la respuesta de la API
            if (!response.ok) {
                throw new Error(`Failed to fetch games: ${response.statusText}`);
            }
            const games = (yield response.json());
            // Transforma las URL de las portadas a una calidad alta
            return games.map(game => {
                var _a;
                return (Object.assign(Object.assign({}, game), { cover: Object.assign(Object.assign({}, game.cover), { url: ((_a = game.cover) === null || _a === void 0 ? void 0 : _a.url) ? game.cover.url.replace('t_thumb', 't_cover_big') : null }) }));
            });
        }
        catch (error) {
            console.error("Error fetching game covers:", error);
            throw error; // Re-lanzamos el error para depuración
        }
    });
}
// * VISUALIZAR JSON: http://localhost:5000/api/dataGames
