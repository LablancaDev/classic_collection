import React, { useEffect, useState } from 'react'

import backImage from '../assets/imgs/backNinja.jpg'

const PortadasBuenas = () => {

    const [games, setGames] = useState([])

    useEffect(() => {
        async function fetchTheGamesDb() {

            try {
                const response = await fetch('http://localhost:5000/api/data_TheGamesDb')

                if (!response.ok) throw new Error("Error al obtener los datos");

                const data = await response.json();

                setGames(data)
                console.log(data)


            } catch (error) {

            }
        }
        fetchTheGamesDb()
    }, [])


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
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-25"></div>

            <div>

            </div>
        </div>


    )
}

export default PortadasBuenas