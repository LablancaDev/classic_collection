import React from 'react';
import imgBack from '../assets/imgs/marvel-vs-capcom.avif';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div
                className="navbar navbar-expand-lg py-5 position-relative fs-5 d-flex flex-column justify-content-center align-items-center text-center"
                style={{
                    backgroundImage: `url(${imgBack})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                    minHeight: '100vh',
                }}
            >
                {/* Capa oscura */}
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

                {/* Contenido principal */}
                <div className="position-relative" style={{ zIndex: 2 }}>
                    <h1
                        className="text-center"
                        style={{
                            color: '#FFD700', // Amarillo vibrante
                            fontSize: '3rem',
                            fontFamily: "'Press Start 2P', cursive",
                            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)',
                            lineHeight: '1.5',
                            marginBottom: '20px', // Espacio entre el texto y el botón
                        }}
                    >
                        "Organiza, descubre y presume tu colección de videojuegos como nunca antes."
                    </h1>

                    {/* Botón con diseño moderno en tonos rosa y morado */}
                    <Link to={'/MyCollection'}>
                    <button
                        className="btn custom-btn"
                        style={{
                            background: 'linear-gradient(45deg, #ff0080, #8000ff)',
                            color: 'white',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            padding: '15px 40px',
                            borderRadius: '25px',
                            border: '1px solid orange',
                            boxShadow: '0 4px 10px rgba(0, 0, 128, 5)',
                            transition: 'all 0.3s ease-in-out',
                        }}
                        onMouseOver={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)';
                        }}
                        onMouseOut={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                        }}
                        >
                        Start
                    </button>
                        </Link>

                </div>
            </div>
        </>
    );
};

export default Home;
