var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function fetchAPITheGamesDb() {
    return __awaiter(this, void 0, void 0, function* () {
        const API_KEY = "bb08622a";
        const URL = `https://api.thegamesdb.net/v1/Games/ByGameName?apikey=${API_KEY}&name=Zelda`;
        try {
            const response = yield fetch(URL);
            // 🔥 Debug: Verifica el status de la respuesta
            console.log(`Status de la respuesta: ${response.status}`);
            if (!response.ok) {
                throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
            }
            const data = yield response.json();
            console.log("Conexión exitosa con API TheGamesDb:", data);
            return data;
        }
        catch (error) {
            console.error("Error al conectar con TheGamesDb:", error);
            return null;
        }
    });
}
