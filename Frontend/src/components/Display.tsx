import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import fullSistems from '../assets/imgs/Consolas.jpg'
import superNintendoLogo from '../assets/imgs/Logo_SNES.png';
import nintendoLogo from '../assets/imgs/Nintendo.png';
import playstationLogo from '../assets/imgs/PlayStation.png';
import playstation2Logo from '../assets/imgs/PlayStation2.png';
import playstation3Logo from '../assets/imgs/ps3-logo.png';
import playstation4Logo from '../assets/imgs/ps4-logo.webp';
import xboxLogo from '../assets/imgs/xbox.png';
import segaSaturnLogo from '../assets/imgs/Sega_Saturn_USA_logo.svg.png';
import megaDriveGenesis from '../assets/imgs/megadrive.svg';
import xbox360Logo from '../assets/imgs/xbox-360.png';
import wiiLogo from '../assets/imgs/1200px-Wii_logo.png';

import superFamicomLogo from '../assets/imgs/megadrive.svg';
import { Game } from '../types/gameTypes'

// * Como voy a utilizar las interfaz Game en varios archivos para evitar redundancias defino la interfaz Game en un archivo aparte: gameTypes.ts 
// Interfaz que define la estructura de un juego
// interface Game {
//   name: string; // Nombre del juego
//   platform: string; // Plataforma en la que está disponible, para poder filtrar correctamente en la colección
//   cover?: {     // Imagen de la portada desde la API, se obtiene de la API cuando busco juegos de una plataforma específica.
//     url: string;
//   };
//   coverUrl?: string; // Imagen de la portada almacenada en la base de datos, se almacena en la base de datos cuando el usuario añade un juego a su colección, se usa para mostrar la portada de un juego en la colección personal del usuario.
// }

// Interfaz para las props que recibe este componente Display del componente Menu.tsx
interface DisplayProps {
  selectedPlatform: string | null; // Plataforma seleccionada (puede ser null) si no hay selección
  viewCollection: boolean; // Indica si se está viendo la colección del usuario
  setViewCollection: (value: boolean) => void; // Función para actualizar viewCollection, añadimos esta prop para poder cambiar viewCollection desde Display
}

// Componente Display: muestra los juegos de la plataforma seleccionada o la colección del usuario
function Display({ selectedPlatform, viewCollection, setViewCollection }: DisplayProps) {

  // Obtengo el user Id desde Redux ya que lo necesito para asociar al usuario que tiene la sesión iniciada con el juego que elijo para la colección
  const user_id = useSelector((state: RootState) => state.auth.user_id);

  // Estado para almacenar la lista de juegos obtenidos de la API
  const [games, setGames] = useState<Game[]>([]);
  // Estado para manejar la barra de búsqueda de juegos
  const [search, setSearch] = useState('');
  // Estado para la colección de juegos guardados por el usuario
  const [myCollection, setMyCollection] = useState<Game[]>([]);

  // 📌 Nuevo estado para la plataforma seleccionada en la colección
  const [selectedCollectionPlatform, setSelectedCollectionPlatform] = useState<string | null>(null);

  // 📌 Obtener una lista de plataformas únicas dentro de la colección del usuario
  const uniquePlatforms = Array.from(new Set(myCollection.map((game) => game.platform)));

  // 🟢 Estado para rastrear qué juegos han sido añadidos recientemente (para mostrar mensaje visual de juego añadido correctamente)
  const [addedGames, setAddedGames] = useState<{ [key: string]: boolean }>({});

  // 🔴 Estado para rastrear qué juegos ya están agregados (para mostrar mensaje visual de juego añadido a la colección si se selecciona 2 veces)
  const [alreadyAddedGames, setAlreadyAddedGames] = useState<{ [key: string]: boolean }>({});

  // 🎯 Estado para almacenar el juego seleccionado (vista previa del juego)
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  // 🎯 Estado para mostrar/ocultar el modal (vista previa del juego)
  const [showModal, setShowModal] = useState(false);

  // 🎯Función para manejar la apertura del modal y establecer el juego seleccionado (vista previa del juego)
  const handleShowGameDetails = (game: Game) => {
    setSelectedGame(game);
    setShowModal(true);
  };

  // Cargar juegos de la API cuando el usuario selecciona una plataforma,cada vez que cambia selectedPlatform, se ejecuta este useEffect
  useEffect(() => {
    if (selectedPlatform) {
      setViewCollection(false); // Salir de la vista de la colección cuando se elige una plataforma
      setSelectedCollectionPlatform(null); // 🔹 Reiniciamos el filtro de plataformas dentro de la colección
      setGames([]); // 🔹 Vaciar la lista de juegos antes de cargar nuevos

      // Función asíncrona para obtener juegos de la API según la plataforma seleccionada
      async function fetchFilteredGames() {
        try {
          const response = await fetch(`http://localhost:5000/api/dataGames?platform=${selectedPlatform}`);
          const data = await response.json();

          // ver los datos completos del juego, incluyendo rating, summary, platforms, etc.
          console.log(data);

          setGames(data); // Guarda los juegos obtenidos en el estado

        } catch (error) {
          console.error('Error fetching game covers:', error);
        }
      }
      fetchFilteredGames();
    } else {
      setGames([]); // Si no hay plataforma seleccionada, limpia la lista de juegos
    }
  }, [selectedPlatform]); // Se ejecuta cada vez que cambia `selectedPlatform` 




  // Cargar colección del usuario cuando se inicia sesión/cambio de usuario o se pulsa el botón,También se cargue automáticamente cuando no haya una plataforma seleccionada (es decir, cuando el usuario inicia sesión). Se vuelva a actualizar si cambia el user_id (por ejemplo, si otro usuario inicia sesión).
  useEffect(() => {
    if (viewCollection || (!selectedPlatform && user_id)) {
      fetch(`http://localhost:5000/api/myCollection?user_id=${user_id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("📌 Juegos en mi colección:", data); // <-- Verifica los datos en consola
          setMyCollection(data); //Se actualiza myCollection con los juegos del usuario recuperados de MongoDB.
        })
        .catch((error) => console.error('Error fetching collection:', error));
    }
  }, [viewCollection, selectedPlatform, user_id]);

  console.log(myCollection)


  // Función para agregar un juego a la colección del usuario
  const handleSelectGame = async (game: Game, platform: string | null) => {
    if (!user_id) {
      console.error('No user logged in.');
      return;
    }
    // Si la plataforma no se define en el juego, usa la plataforma seleccionada
    const gamePlatform = game.platform || platform;

    console.log("Plataforma:", platform)

    if (!gamePlatform) {
      console.error('Platform is required.');
      return;
    }

    // 🔹 Verificar si el juego ya está en la colección
    const gameExists = myCollection.some((g) => g.name === game.name && g.platform === gamePlatform);

    // Si el juego ya está en la colección se muestra al usuario de forma visual
    if (gameExists) {
      console.warn('Game already exists in collection.');

      // 🔴 Mostrar el mensaje de "Juego ya añadido"
      setAlreadyAddedGames((prev) => ({ ...prev, [game.name]: true }));

      // 🔴 Ocultar el mensaje después de 3 segundos
      setTimeout(() => {
        setAlreadyAddedGames((prev) => ({ ...prev, [game.name]: false }));
      }, 3000);
      return; // 🔹 Salimos de la función para evitar la petición innecesaria 
      // (si el juego ya está en la colección no tiene sentido realizar la petición de ahí el return para detener el flujo de ejecución.)
    }

    // 🟢 Mostrar el mensaje de "Juego Añadido" antes de la llamada a la API
    setAddedGames((prev) => ({ ...prev, [game.name]: true }));

    try {
      // Agregar el juego a la colección del usuario
      const response = await fetch('http://localhost:5000/api/selectGame', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: game.name,
          user_id,
          platform: gamePlatform,
          coverUrl: game.cover?.url ? `https:${game.cover.url}` : game.coverUrl,
          summary: game.summary || 'No summary available',
          rating: game.rating || 0,
        })
      });

      if (response.ok) {
        console.log('Game saved successfully!');

        //  🔹 Actualizar los datos después de seleccionar un juego
        // Buscará el usuario por su user_id.
        // Recuperará la colección de juegos (es decir, el array myCollection).
        // Devolverá la colección de juegos al cliente.
        fetch(`http://localhost:5000/api/myCollection?user_id=${user_id}`)
          .then((response) => response.json())
          .then((data) => {
            setMyCollection(data);// Solo actualiza la colección, no borra los juegos de la API como setGames([]);
            // setGames([]); // 🔹 Limpiar la lista de juegos de la API, borra los datos y de esta manera (si no hay datos en la colección vuelve la selección de juegos, mejor no usar...)
          })
          .catch((error) => console.error('Error updating collection:', error));

        // 🟢 Ocultar el mensaje después de 2 segundos
        setTimeout(() => {
          setAddedGames((prev) => ({ ...prev, [game.name]: false }));
        }, 3000);

      } else {
        console.error('Failed to save game:', await response.json());
      }
    } catch (error) {
      console.error('Error saving game:', error);
    }
  };

  // Eliminar un juego de la colección (Drag & Drop)
  const handleRemoveGame = async (game: Game) => {
    if (!user_id) return;

    const nameRemove = game.name;

    try {
      const response = await fetch('http://localhost:5000/api/removeGame', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nameRemove, user_id }),
      });

      if (response.ok) {
        fetch(`http://localhost:5000/api/myCollection?user_id=${user_id}`)
          .then((response) => response.json())
          .then((data) => setMyCollection(data))
          .catch((error) => console.error('Error updating collection:', error));
      }
    } catch (error) {
      console.error('Error removing game:', error);
    }
  };



  // Función para filtrar juegos por nombre
  const filteredGames = (gamesToDisplay: Game[]) => {
    return gamesToDisplay.filter((game) =>
      game.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  // 📌 Filtrar juegos de la colección según la plataforma seleccionada en la colección
  const filteredCollectionGames = selectedCollectionPlatform
    ? myCollection.filter((game) => game.platform === selectedCollectionPlatform)
    : myCollection;

  // 📌 Determinar qué juegos mostrar (API o colección)
  const displayedGames = (viewCollection || !selectedPlatform)
    ? filteredGames(filteredCollectionGames)
    : filteredGames(games);




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


      {/* 📌 Menú de plataformas dentro de la colección */}
      {viewCollection && uniquePlatforms.length > 0 && (
        <div className="platform-menu my-3 border rounded p-4 d-flex flex-wrap justify-content-center gap-3 bg-dark bg-opacity-75 text-light">

          {/* Botón para ver todas las plataformas */}
          <button
            className="btn btn-light border d-flex flex-column align-items-center justify-content-center bg-secondary"
            style={{ width: '200px', height: '100px', overflow: 'hidden' }}
            onClick={() => setSelectedCollectionPlatform(null)}
          >
            <img
              src={fullSistems}
              alt="Todas las plataformas"
              className="img-fluid w-100 h-100"
              style={{ objectFit: 'contain' }} // Mantiene proporciones sin recortar
            />
            {/* <p className="text-light mt-2">Todos los sistemas</p> */}
          </button>

          {/* Botones de plataformas */}
          {uniquePlatforms.map((platform) => {
            const platformImages = {
              'Super Nintendo Entertainment System': superNintendoLogo,
              'Nintendo Entertainment System': nintendoLogo,
              'PlayStation 2': playstation2Logo,
              'Xbox': xboxLogo,
              'Xbox 360': xbox360Logo,
              'Sega Saturn': segaSaturnLogo,
              'Sega Mega Drive/Genesis': megaDriveGenesis,
              'Super Famicom': superFamicomLogo,
              'Wii': wiiLogo,
              'PlayStation': playstationLogo,
              'PlayStation 3': playstation3Logo,
              'PlayStation 4': playstation4Logo,
              'MegaDrive': megaDriveGenesis
            };

            return (
              <button
                key={platform}
                className={`btn border d-flex flex-column align-items-center justify-content-center p-3 ${selectedCollectionPlatform === platform ? 'btn-primary' : 'btn-secondary'}`}
                style={{ width: '200px', height: '100px', overflow: 'hidden' }}
                onClick={() => setSelectedCollectionPlatform(platform)}
              >
                <img
                  // indico a TypeScript que platform es una clave válida de platformImages
                  src={platformImages[platform as keyof typeof platformImages] || ''}
                  alt={platform}
                  className="img-fluid w-100 h-100"
                  style={{ objectFit: 'contain' }} // Ajusta la imagen sin deformarla
                />
              </button>
            );
          })}
        </div>
      )}


      {/* Mostrar el nombre del sistema cuando se cambia de uno a otro*/}
      <div>
        <h3 className="text-light text-center py-3">
          {selectedCollectionPlatform ? `Mis Juegos - ${selectedCollectionPlatform}` : 'Mis Juegos'}
        </h3>
      </div>


      {/* Sección de juegos mostrados en una cuadrícula */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        {displayedGames.length > 0 ? (
          displayedGames.map((game, index) => (
            <div className="col" key={index}>
              <div className="card h-100 shadow-sm card-game position-relative">
                {/* 🔹 Ahora verificamos tanto `game.cover.url` como `game.coverUrl` */}

                {/* 🟢Mensaje de juego añadido */}
                {addedGames[game.name] && (
                  <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-success bg-opacity-75 text-white fw-bold">
                    Juego Añadido
                  </div>
                )}

                {/* 🔴 Mensaje de juego ya añadido */}
                {alreadyAddedGames[game.name] && (
                  <div className="position-absolute text-center top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-danger bg-opacity-75 text-dark fw-bold">
                    Juego ya añadido
                  </div>
                )}


                {game.cover?.url || game.coverUrl ? (
                  <img
                    // Si alguno de estos valores es true, significa que el estado del juego ha cambiado (se ha añadido o ya estaba en la colección). Por lo tanto genera un nuevo identificador, forzando a React a volver a renderizar el componente para mostrar los mensajes visuales correctamente (solo mostraba los mensajes al hacer click depués de quitar el ratón de la cover del juego).
                    key={addedGames[game.name] || alreadyAddedGames[game.name] ? `${game.name}-updated` : game.name} // 🔹 Clave única para forzar re-render
                    src={game.cover?.url ? `https:${game.cover.url}` : game.coverUrl}
                    alt={`${game.name} Cover`}
                    className="card-img-top cover-image"
                    onClick={() => handleSelectGame(game, selectedPlatform)}
                  />
                ) : (
                  <p className="text-center my-2">No cover available</p>
                )}
                <div className='position-absolute bottom-0 w-100 d-flex justify-content-between align-items-center '>
                  <div className='p-1'>
                    <button
                      className='btn btn-success bg-dark bg-opacity-50 m-auto '
                      onClick={() => handleShowGameDetails(game)} //  Abre el modal con las descripción del juego
                    ><i className="bi bi-eye"></i></button>
                  </div>
                  <div className='p-1'>
                    <button
                      className='btn btn-danger bg-dark bg-opacity-50'
                      onClick={() => handleRemoveGame(game)}
                    ><i className="bi bi-trash"></i></button>
                  </div>
                </div>
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

      {/* 🎯 Modal de Detalles del Juego*/}
      {selectedGame && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedGame.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <img
              src={selectedGame.cover?.url ? `https:${selectedGame.cover.url}` : selectedGame.coverUrl}
              alt={`${selectedGame.name} Cover`}
              className="img-fluid mb-3"
              style={{ borderRadius: '10px' }}
            />
            <p className="fw-bold">Rating: ⭐ {selectedGame.rating || 'N/A'}</p>
            <p className="text-muted">{selectedGame.summary || 'No description available.'}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}


    </div>
  );
}

export default Display;


// 📌 Resultado
// ✅ Cuando el usuario selecciona una plataforma, se muestran los juegos de la API.
// ✅ Cuando no hay juegos de la API, se muestra la colección guardada del usuario.
// ✅ Si el usuario hace clic en "Mi colección", se muestra su colección personal.