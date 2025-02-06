import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

// Interfaz que define la estructura de un juego
interface Game {
  name: string; // Nombre del juego
  cover?: {     // Se obtiene de la API cuando busco juegos de una plataforma específica, para mostrar portadas en la lista de juegos disponibles en la API.
    url: string; 
  };
  coverUrl?: string; // Se almacena en la base de datos cuando el usuario añade un juego a su colección, se usa para mostrar la portada de un juego en la colección personal del usuario.
}

// Interfaz para las props que recibe este componente Display del componente Menu.tsx
interface DisplayProps {
  selectedPlatform: string | null; // Plataforma seleccionada (puede ser null)
  viewCollection: boolean; // Añadimos viewCollection como prop y usamos useEffect para obtener los juegos guardados del usuario.
}

// Componente Display: muestra los juegos de la plataforma seleccionada o la colección del usuario
function Display({ selectedPlatform, viewCollection }: DisplayProps) {

  // Obtengo el user Id del store ya que lo necesito para asociar al usuario que tiene la sesión iniciada con el juego que elijo para la colección
  const user_id = useSelector((state: RootState) => state.auth.user_id);

  // Estado para almacenar la lista de juegos de la API
  const [games, setGames] = useState<Game[]>([]);
  // Estado para manejar la barra de búsqueda
  const [search, setSearch] = useState('');
  // Estado para la colección de juegos guardados por el usuario
  const [myCollection, setMyCollection] = useState<Game[]>([]);

  // Efecto que se ejecuta cuando cambia la plataforma seleccionada
  useEffect(() => {
    if (selectedPlatform) {
      // Función asíncrona para obtener juegos de la API según la plataforma seleccionada
      async function fetchFilteredGames() {
        try {
          const response = await fetch(`http://localhost:5000/api/dataGames?platform=${selectedPlatform}`);
          const data = await response.json();

          // Aquí realizamos el console.log para ver los datos completos del juego, incluyendo rating, summary, platforms, etc.
          console.log(data); // Esto te permitirá ver todos los juegos con su rating, platforms, etc.

          setGames(data); // Guarda los juegos obtenidos en el estado

        } catch (error) {
          console.error('Error fetching game covers:', error);
        }
      }
      fetchFilteredGames();
    } else {
      setGames([]); // Si no hay plataforma seleccionada, limpia la lista de juegos
    }
  }, [selectedPlatform]); // Se ejecuta cada vez que `selectedPlatform` cambia




  // Cargar colección del usuario cuando se inicia sesión o se pulsa el botón,También se cargue automáticamente cuando no haya una plataforma seleccionada (es decir, cuando el usuario inicia sesión). Se vuelva a actualizar si cambia el user_id (por ejemplo, si otro usuario inicia sesión).
  useEffect(() => {
    if (viewCollection || (!selectedPlatform && user_id)) {
      fetch(`http://localhost:5000/api/myCollection?user_id=${user_id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("📌 Juegos en mi colección:", data); // <-- Verifica los datos en consola
          setMyCollection(data);
        })
        .catch((error) => console.error('Error fetching collection:', error));
    }
  }, [viewCollection, selectedPlatform, user_id]);

  console.log(myCollection)


  // Función para manejar la selección de un juego y enviarlo a la API
  const handleSelectGame = async (gameName: string, platform: string | null, coverUrl?: string) => {
    if (!user_id) {
      console.error('No user logged in.');
      return;
    }

    if (!platform) {
      console.error('Platform is required.');
      return;
    }

    // 🔹 Verificar si el juego ya está en la colección
    const gameExists = myCollection.some((game) => game.name === gameName);
    if (gameExists) {
      console.warn('Game already exists in collection.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/selectGame', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: gameName, user_id, platform, coverUrl }),
      });

      if (response.ok) {
        console.log('Game saved successfully!');

        //  🔹 Cambiar a la vista de colección y actualizar los datos después de seleccionar un juego

        fetch(`http://localhost:5000/api/myCollection?user_id=${user_id}`)
          .then((response) => response.json())
          .then((data) => {
            setMyCollection(data);// Solo actualiza la colección, no borra los juegos de la API como setGames([]);
            // setGames([]); // 🔹 Limpiar la lista de juegos de la API, borra los datos y de esta manera (si no hay datos en la colección vuelve la selección de juegos, mejor no usar...)
          })
          .catch((error) => console.error('Error updating collection:', error));
        

      } else {
        console.error('Failed to save game:', await response.json());
      }
    } catch (error) {
      console.error('Error saving game:', error);
    }
  };


  // Filtrar juegos según la búsqueda
  const filteredGames = (gamesToDisplay: Game[]) => {
    return gamesToDisplay.filter((game) =>
      game.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  // Determinamos los juegos a mostrar: si hay una plataforma seleccionada mostramos los juegos de la API,
  // si no, mostramos la colección personal del usuario
  const displayedGames = (viewCollection || !selectedPlatform) ? filteredGames(myCollection) : filteredGames(games);


  return (
    <div className="container my-4">
      {/* Muestra el título dependiendo de si hay una plataforma seleccionada */}
      <h2 className="text-center mb-4">
        {selectedPlatform ? `Games for ${selectedPlatform}` : 'My Collection'}
      </h2>

      {/* Barra de búsqueda */}
      <label htmlFor="searchGames">Search Games:</label>
      <input
        id="searchGames"
        onChange={(e) => setSearch(e.target.value)}
        className="form-control my-3"
        type="search"
        placeholder={selectedPlatform ? 'Search platform games...' : 'Search my collection...'}
        disabled={false} // 🔹 Ya no lo deshabilitamos, permite seguir escribiendo
        // disabled={displayedGames.length === 0} // Se desactiva si no hay juegos, no permite seguir escribiendo si no hay coincidencia bloqueando el buscardor.
      />

      {/* Sección de juegos mostrados en una cuadrícula */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        {displayedGames.length > 0 ? (
          displayedGames.map((game, index) => (
            <div className="col" key={index}>
              <div className="card h-100 shadow-sm card-game">
                {/* 🔹 Ahora verificamos tanto `game.cover.url` como `game.coverUrl` */}
                {game.cover?.url || game.coverUrl ? (
                  <img
                    src={game.cover?.url ? `https:${game.cover.url}` : game.coverUrl}
                    alt={`${game.name} Cover`}
                    className="card-img-top cover-image"
                    onClick={() => handleSelectGame(game.name, selectedPlatform, game.cover?.url ? `https:${game.cover.url}` : game.coverUrl)}
                  />
                ) : (
                  <p className="text-center my-2">No cover available</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">
            {selectedPlatform
              ? 'No games available for the selected platform.'
              : 'Your collection is empty.'}
          </p>
        )}
      </div>

    </div>
  );
}

export default Display;


// 📌 Resultado
// ✅ Cuando el usuario selecciona una plataforma, se muestran los juegos de la API.
// ✅ Cuando no hay juegos de la API, se muestra la colección guardada del usuario.
// ✅ Si el usuario hace clic en "Mi colección", se muestra su colección personal.