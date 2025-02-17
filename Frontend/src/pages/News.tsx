import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import backImage from "../assets/imgs/Japanese-Art.jpg";
import dataDevelopers from "../dataDevelopers/dataDevelopers";

const News = () => {
    // Estados
    const [dataApi, setDataApi] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const userId = useSelector((state: RootState) => state.auth.user_id);

    // Función para obtener datos de la API
    const fetchDataApiRawg = async (endpoint: string) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/data_rawg/${endpoint}`);
            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setDataApi(data.results || []);
            console.log(data.results);
        } catch (error) {
            console.error("Error al recibir los datos del backend", error);
        } finally {
            setLoading(false);
        }
    };

    // Alternar visibilidad de detalles
    const handleItemClick = (index: number) => {
        setSelectedItem(selectedItem === index ? null : index);
    };

    return (
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
            {/* Botones de categorías */}
            <div className="row d-flex justify-content-center align-items-center text-center gap-3">
                {["developers", "screenShoots", "stores", "game-series", "publishers"].map((category) => (
                    <div className="col-auto" key={category}>
                        <button className="btn btn-dark w-100" onClick={() => fetchDataApiRawg(category)}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    </div>
                ))}
            </div>

            {/* Contenido de la API */}
            <div className="container-fluid my-5">
                <div className="row justify-content-center">
                    <div className="col-12">
                        {loading && <p className="text-light">Cargando...</p>}
                        {!loading && dataApi.length === 0 && <p className="text-light">No hay datos disponibles.</p>}
                        {!loading && dataApi.length > 0 && (
                            <div className="d-grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))" }}>
                                {dataApi.map((item, index) => {
                                    // Buscar si la compañía existe en dataDevelopers
                                    const companyData = dataDevelopers.find(
                                        (dev) => dev.name.toLowerCase() === item.name.toLowerCase()
                                    );

                                    return (
                                        <div key={index} className="mb-4">
                                            {/* Botón principal */}
                                            <button
                                                className="btn btn-warning w-100 text-start"
                                                onClick={() => handleItemClick(index)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <div className="card-body p-2">
                                                    {/* Imagen extra si existe en dataDevelopers */}
                                                    {companyData && (
                                                        <div className="text-center">
                                                            <img
                                                                src={companyData.image}
                                                                alt={companyData.name}
                                                                className="img-fluid mb-3 rounded"
                                                                style={{ maxHeight: "100px" }}
                                                            />
                                                        </div>
                                                    )}

                                                    <h4 className="text-dark">{item.name}</h4>

                                                    {/* Imagen de fondo de la API */}
                                                    {item.image_background && (
                                                        <img src={item.image_background} alt={item.name} className="img-fluid pb-3 rounded" />
                                                    )}
                                                </div>
                                            </button>

                                            {/* Mostrar detalles si está seleccionado */}
                                            {selectedItem === index && (
                                                <div className="card mt-2 bg-dark bg-opacity-50 text-light">
                                                    <div className="card-body p-3">
                                                        {/* Información extra de dataDevelopers */}
                                                        {companyData && (
                                                            <div className="bg-secondary rounded p-2 mb-3">
                                                                <h5 className="text-dark">Información de {companyData.name}:</h5>
                                                                <p>{companyData.info}</p>
                                                                <h6>Juegos Destacados:</h6>
                                                                <ul>
                                                                    {companyData.topGames.map((game, i) => (
                                                                        <li key={i}>{game}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}

                                                        {/* Información de la API */}
                                                        <div className="d-flex justify-content-between bg-secondary rounded p-2">
                                                            <p className="text-dark">Detalles de {item.name}:</p>
                                                            <p>Juegos Desarrollados: {item.games_count}</p>
                                                        </div>

                                                        <p className="text-start">Algunos de sus títulos:</p>
                                                        <ul>
                                                            {item.games.map((game: any, i: number) => (
                                                                <li className="text-start" key={i}>
                                                                    <p>{game.name}</p>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default News;
