import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

// Interfaz que define la estructura de un juego
interface Game {
  name: string; // Nombre del juego
  cover?: {     // Imagen de portada opcional
    url: string;
  };
}

// Interfaz para las props que recibe este componente Display del componente Menu.tsx          
interface DisplayProps {
  selectedPlatform: string | null; // Plataforma seleccionada (puede ser null)
}

// Componente Display: muestra los juegos de la plataforma seleccionada o la colección del usuario
// Recibe selectedPlatform como una prop desde Menu.tsx
function Display({ selectedPlatform }: DisplayProps) {

  // Obtengo el user Id del store ya que lo necesito para asociar al usuario que tiene la sesión iniciada con el juego que elijo para la colección (function handleSelectGame())
  const user_id = useSelector((state:RootState) => state.auth.user_id); 
  
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

  // Manejar cambios en la barra de búsqueda
  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Filtrar juegos según la búsqueda y la plataforma seleccionada
  const displayedGames = selectedPlatform
    ? games.filter((game) => game.name.toLowerCase().includes(search.toLowerCase()))
    : myCollection.filter((game) => game.name.toLowerCase().includes(search.toLowerCase()));

  // Función para manejar la selección de un juego y enviarlo a la API
  const handleSelectGame = async (gameName: string) => {

    console.log(user_id)
    // Si el user_id no existe(es decir, si no ha iniciado sesión nadie, error)
    if(!user_id){
      console.error("No user logged in.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/selectGame', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: gameName , user_id}),
      });

      if (response.ok) {
        console.log('Game saved successfully!');
      } else {
        console.error('Failed to save game:', await response.json());
      }
    } catch (error) {
      console.error('Error saving game:', error);
    }
  };

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
        onChange={handleInputSearch}
        className="form-control my-3"
        type="search"
        placeholder={selectedPlatform ? 'Search platform games...' : 'Search my collection...'}
        disabled={displayedGames.length === 0} // Se desactiva si no hay juegos
      />

      {/* Sección de juegos mostrados en una cuadrícula */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        {displayedGames.length > 0 ? (
          displayedGames.map((game, index) => (
            <div className="col" key={index}>
              <div className="card h-100 shadow-sm card-game">
                {/* Muestra la portada del juego si está disponible */}
                {game.cover && game.cover.url ? (
                  <img
                    src={`https:${game.cover.url}`}
                    alt={`${game.name} Cover`}
                    className="card-img-top cover-image"
                    onClick={() => handleSelectGame(game.name)} // Guarda el juego al hacer clic
                  />
                ) : (
                  <p className="text-center my-2">No cover available</p>
                )}
              </div>
            </div>
          ))
        ) : (
          // Mensaje si no hay juegos disponibles
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
