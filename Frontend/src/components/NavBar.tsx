import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import manga from '../assets/imgs/manga.jpg'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { logoutUser } from '../redux/authSlice'
import { useDispatch } from 'react-redux'


const NavBar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Obtener usuario desde Redux
    const userName = useSelector((state: RootState) => state.auth.userName)
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated); 

    // const user_id = useSelector((state: RootState) => state.auth.user_id)

    const handleLogout = () => {  
        dispatch(logoutUser());
        navigate('login');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg py-5 position-relative fs-5" style={{
                backgroundImage: `url(${manga})`, backgroundSize: 'cover',
                backgroundPosition: 'initial',
                backgroundRepeat: 'no-repeat',
                minHeight: "35vh",
                display: "flex",
                justifyContent: "center",
            }}>
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

                <div className="container-fluid d-flex flex-column text-nav">
                    {isAuthenticated ? (
                        <>
                            <div className="position-absolute top-0 end-0 p-3 d-flex align-items-center gap-3"> {/*posicionar nombre y botón en esquina sup derecha*/}
                                {/* <span className='text-warning'>{user_id}</span> */}
                                <span className='text-warning'>{userName}</span>
                                <button className='btn btn-secondary' onClick={handleLogout}>Cerrar sesión</button>
                            </div>
                        </>
                    ) : (
                        <span></span>
                    )}
                    <div className="d-flex justify-content-between align-items-center gap-5">

                        <h2 className="mb-5 title">Classic Collection</h2>
                    </div>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav m-auto gap-5">
                            <Link to={"/home"}>
                                <a className="nav-link custom-link" aria-current="page" href="#">Home</a>
                            </Link>
                            <Link to={"Mycollection"}>
                                <a className="nav-link custom-link" href="#">My Collection</a>
                            </Link>
                            <Link to={'/games'}>
                                <a className="nav-link custom-link" href="#">Games</a>
                            </Link>
                            <Link to={"/login"}>
                                <a className="nav-link custom-link" aria-disabled="true">Login</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar