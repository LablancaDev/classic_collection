// # API Key conexión a API rawg
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function fetchAPIrawg(endpoint) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const RAWG_API_KEY = "f504817288c9452985ef0b7f82fab3d6";
            const response = yield fetch(`https://api.rawg.io/api/${endpoint}?key=${RAWG_API_KEY}`);
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
            }
            const data = yield response.json();
            console.log('Conexión exitosa con RAWG API:', data); // Verifica la respuesta
            return data;
        }
        catch (error) {
            console.error('Error al conectar con la API de RAWG:', error);
            return null;
        }
    });
}
// 🔥 Consumo de Api rawg obtener lista de juegos para el componente Game.tsx (de momento de prueba)
export function fetchAPIrawgPrueba() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const RAWG_API_KEY = "f504817288c9452985ef0b7f82fab3d6";
            const response = yield fetch(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page_size=40`);
            // const response = await fetch(`https://api.rawg.io/api/games/${gameId}/screenshots?key=${RAWG_API_KEY}`);
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
            }
            const data = yield response.json();
            console.log('Conexión exitosa con RAWG API:', data); // Verifica la respuesta
            return data;
        }
        catch (error) {
            console.error('Error al conectar con la API de RAWG:', error);
            return null;
        }
    });
}
// Puedes cambiar ordering a -released para obtener los más nuevos primero ó -rating para los más valorados: &page_size=40&ordering=-released
