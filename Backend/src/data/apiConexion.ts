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

// Definir una interfaz para el objeto de respuesta de autenticación
interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

// Definir interfaz para el objeto de cada juego
interface Game {
  name: string;
  cover?: {
    url: string | null;
  };
  platforms: { name: string }[]; // Plataforma asociada a cada juego
}

// Función para obtener el token de acceso de Twitch
async function getAccessToken(): Promise<string> {
  try {
    const response = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
    });

    // Verificar si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error(`Failed to get access token: ${response.statusText}`);  
    }

    const data = (await response.json()) as AccessTokenResponse;
    return data.access_token;
  } catch (error) {
    console.error("Error obteniendo el access token:", error);
    throw error; // Re-lanzamos el error para depuración
  }
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
export async function fetchGameCovers(platform?: string): Promise<Game[]> {
  try {
    const accessToken = await getAccessToken();
    const platformFilter = platform ? `where platforms.name = "${platform}";` : '';

    const response = await fetch('https://api.igdb.com/v4/games', {
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

    const games = (await response.json()) as Game[];

    // Transforma las URL de las portadas a una calidad alta
    return games.map(game => ({
      ...game,
      cover: {
        ...game.cover,
        url: game.cover?.url ? game.cover.url.replace('t_thumb', 't_cover_big') : null
      }
    }));
  } catch (error) {
    console.error("Error fetching game covers:", error);
    throw error; // Re-lanzamos el error para depuración
  }
}

// * VISUALIZAR JSON: http://localhost:5000/api/dataGames




