
// # API Key conexión a API rawg


export async function fetchAPIrawg(endpoint: string) {
    try {
        const RAWG_API_KEY = "f504817288c9452985ef0b7f82fab3d6"

        const response = await fetch(`https://api.rawg.io/api/${endpoint}?key=${RAWG_API_KEY}`);

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Conexión exitosa con RAWG API:', data); // Verifica la respuesta
        return data;

    } catch (error) {
        console.error('Error al conectar con la API de RAWG:', error);
        return null;
    }
}


// 🔥 Consumo de Api rawg obtener lista de juegos para el componente Game.tsx (de momento de prueba)

export async function fetchAPIrawgPrueba() {
    try {
        const RAWG_API_KEY = "f504817288c9452985ef0b7f82fab3d6"

        const response = await fetch(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page_size=40`);
        // const response = await fetch(`https://api.rawg.io/api/games/${gameId}/screenshots?key=${RAWG_API_KEY}`);

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Conexión exitosa con RAWG API:', data); // Verifica la respuesta
        return data;

    } catch (error) {
        console.error('Error al conectar con la API de RAWG:', error);
        return null;
    }
}
// Puedes cambiar ordering a -released para obtener los más nuevos primero ó -rating para los más valorados: &page_size=40&ordering=-released

