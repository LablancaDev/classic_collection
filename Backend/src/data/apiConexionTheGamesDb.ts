

export async function fetchAPITheGamesDb() {
    const API_KEY = "bb08622a";

    const URL = `https://api.thegamesdb.net/v1/Games/ByGameName?apikey=${API_KEY}&name=Zelda`;

    try {
        const response = await fetch(URL);

        // 🔥 Debug: Verifica el status de la respuesta
        console.log(`Status de la respuesta: ${response.status}`);

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Conexión exitosa con API TheGamesDb:", data);
        return data;
    } catch (error) {
        console.error("Error al conectar con TheGamesDb:", error);
        return null;
    }
}
