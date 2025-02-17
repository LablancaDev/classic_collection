import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import backImage from "../assets/imgs/mk.jpg";

import nes from '../assets/imgs/Nintendo.png'
import snes from '../assets/imgs/Logo_SNES.png'
import megadrive from '../assets/imgs/megadrive.svg'
import play2 from '../assets/imgs/PlayStation2.png'

const Games = () => {
    const userId = useSelector((state: RootState) => state.auth.user_id);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [games, setGames] = useState<any[]>([]);
    const [selectedGame, setSelectedGame] = useState<number | null>(null); // Guardar el ID del juego seleccionado
    const [selectSystem, setSelectSystem] = useState('')

    useEffect(() => {
        async function fetchGames() {
            try {
                const response = await fetch("http://localhost:5000/api/data_rawg");
                if (!response.ok) {
                    throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setGames(data.results || []);
            } catch (error) {
                console.error("Error al obtener juegos:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchGames();
    }, [userId]);

    console.log(games)

    // Alternar la visibilidad de los screenshots
    const toggleScreenshots = (gameId: number) => {
        setSelectedGame(selectedGame === gameId ? null : gameId);
    };

    const filteredGames = games.filter((game) =>
        game.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            {/* Sección de Búsqueda */}
            <div
                className="navbar navbar-expand-lg py-5 position-relative fs-5 d-flex flex-column justify-content-center align-items-center text-center"
                style={{
                    backgroundImage: `url(${backImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    minHeight: "100vh",
                }}
            >
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-25"></div>

                <div className="container my-5">
                    <div className="position-absolute top-0 start-0 end-0 w-50 m-auto mt-5">
                        <label className="text-warning form-label mb-4" htmlFor="search">
                            Buscar Juegos:
                        </label>
                        <input
                            className="form-control"
                            type="search"
                            id="search"
                            placeholder="Ej: The Witcher, GTA V..."
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Nueva funcionalidad para buscar juegos por plataformas o géneros */}
               
                {/* Sección de Juegos */}
                <div className="container my-5">
                    {loading ? (
                        <p className="text-light text-center">Cargando juegos...</p>
                    ) : filteredGames.length === 0 ? (
                        <p className="text-light text-center">No se encontraron juegos.</p>
                    ) : (
                        <div className="row">
                            {filteredGames.map((game) => (
                                <div key={game.id} className="col-md-12 mb-4">
                                    <div className="card bg-dark bg-opacity-75 text-light shadow-lg">
                                        <div className="row g-0">
                                            {/* Imagen del juego */}
                                            <div className="col-md-4">
                                                {game.background_image && (
                                                    <img
                                                        src={game.background_image}
                                                        alt={game.name}
                                                        className="img-fluid rounded-start"
                                                        style={{ height: "100%", objectFit: "cover", cursor: "pointer" }}
                                                        onClick={() => toggleScreenshots(game.id)}
                                                    />
                                                )}
                                            </div>

                                            {/* Información del juego */}
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title text-warning">{game.name}</h5>
                                                    <p className="card-text">
                                                        ⭐ Rating: {game.rating} | 🕹️ Lanzado: {game.released}
                                                    </p>
                                                    <p className="card-text">
                                                        🎮 Plataformas:{" "}
                                                        {game.platforms
                                                            ?.map((p: any) => p.platform.name)
                                                            .join(", ") || "No disponible"}
                                                    </p>
                                                    <p className="card-text">
                                                        📌 Géneros:{" "}
                                                        {game.genres
                                                            ?.map((genre: any) => genre.name)
                                                            .join(", ") || "No disponible"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Sección de screenshots (colapsable) */}
                                        {selectedGame === game.id && game.short_screenshots && (
                                            <div className="collapse show">
                                                <div className="card-body">
                                                    <h6 className="text-warning">📸 Screenshots:</h6>
                                                    <div className="row">
                                                        {game.short_screenshots.map((screenshot: any, index: number) => (
                                                            <div key={index} className="col-md-3 col-6 mb-3">
                                                                <img
                                                                    src={screenshot.image}
                                                                    alt={`Screenshot ${index + 1}`}
                                                                    className="img-fluid rounded shadow-sm"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Games;
