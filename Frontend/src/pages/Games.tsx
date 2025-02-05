import React from 'react'
import backImage from '../assets/imgs/mk.jpg'

export const Games = () => {
    return (
        <>
            <div
                className="navbar navbar-expand-lg py-5 position-relative fs-5 d-flex flex-column justify-content-center align-items-center text-center"
                style={{
                    backgroundImage: `url(${backImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                    minHeight: '100vh',
                }}
            >
            </div>
         
        </>
    )
}

export default Games;