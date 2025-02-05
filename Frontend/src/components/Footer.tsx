import React from 'react'
import manga from '../assets/imgs/manga.jpg'
import logo from '..//assets/imgs/mando_super.png'


function Footer() {
    return (
        <div className='footer p-4 text-center text-light position-relative' style={{
            backgroundImage: `url(${manga})`, backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: "15vh",
            display: "flex",
            justifyContent: "center",
        }}>
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

            <div className='d-block justify-content-between align-items-center'>
                <img src={logo} alt="Logo" className="logoNav" />
                <h3 className=" title m-auto">Classic Collection</h3>
                <p className='text-warning'><span className='text-light'> David Risueño Lablanca </span> ©Todos los derechos reservados 2025</p>
            </div>
            <div>


            </div>
        </div>

    )
}

export default Footer