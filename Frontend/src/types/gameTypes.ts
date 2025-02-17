
// Interfaz que define la estructura de un juego
export interface Game {
  name: string; // Nombre del juego
  platform: string; // Plataforma en la que está disponible, para poder filtrar correctamente en la colección
  cover?: {     // Imagen de la portada desde la API, se obtiene de la API cuando busco juegos de una plataforma específica.
    url: string;
  };
  coverUrl?: string; // Imagen de la portada almacenada en la base de datos, se almacena en la base de datos cuando el usuario añade un juego a su colección, se usa para mostrar la portada de un juego en la colección personal del usuario.
  summary: string;
  rating: number;
}