import React, { useState } from 'react'
import japanese from '../assets/imgs/Japanese-Art.jpg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';

const Login = () => {

    const [changeRegisterLogin, setChangeRegisterLogin] = useState(false)

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    // FUNCTION REGISTER 

    const handleRegister = async (e: React.FormEvent) => {

        e.preventDefault()

        try {

            await axios.post('http://localhost:5000/api/userRegister', {
                userName: name,
                email: email,
                password: password,
            });

            // Limipiar Datos
            // setName('')
            // setPassword('');
            // setEmail('');

            alert('Registro Correcto!');

            console.log('Registro Correcto!, Datos Guardados: ', name, password, email)


        } catch (error: any) {
            if (error.response) {
                console.error('Error durante el registro:', error.response.data.message);
            } else {
                console.error('Error de red o de servidor:', error.message);
            }
        }

    }

    // FUNCTION LOGIN

    const handleLogin = async (e: React.FormEvent) => {

        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/userLogin', {
                email,
                password,
            });

            // Procesa la respuesta
            console.log('Login exitoso:', response.data);

            // Aquí se despacha la acción para guardar al usuario en Redux
            // Suponiendo que 'response.data' contiene la información del usuario
            dispatch(
                setUser({
                    user_id: response.data.userId,
                    userName: response.data.userName,
                    userEmail: response.data.email,
                })
            );

            alert('Login Correto!');

            // Redirigir al usuario a la página de home
            navigate('/home');

        } catch (error: any) {
            if (error.response) {
                console.error('Error durante el Login:', error.response.data.message);
            } else {
                console.error('Error de red o de servidor:', error.message);
            }
        }
    }



    return (
        <div className='container-fluid' style={{
            backgroundImage: `url(${japanese})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            backgroundAttachment: 'fixed'
        }}>
            <div className="row">
                <div className='card w-50 m-auto mt-5 p-5 my-5 login text-light'>
                    <h3 className='text-center py-4'>{changeRegisterLogin ? 'Sign Up' : 'Login'}</h3>
                    <form onSubmit={changeRegisterLogin ? handleRegister : handleLogin}>
                        <div className='m-auto w-50'>
                            <label className='form-label' htmlFor="email">Email:</label>
                            <input
                                className='form-control'
                                type="text"
                                id='email'
                                onChange={handleInputEmail}
                                value={email}
                            />
                        </div>
                        <div className='m-auto w-50 mt-3'>
                            <label className='form-label' htmlFor="password">Password:</label>
                            <input
                                className='form-control'
                                type="password"
                                id='password'
                                onChange={handleInputPassword}
                                value={password}
                            />
                        </div>
                        {changeRegisterLogin ? (
                            <div className='m-auto w-50 mt-3'>
                                <label className='form-label' htmlFor="name">Name:</label>
                                <input
                                    className='form-control'
                                    type="text"
                                    id='name'
                                    onChange={handleInputName}
                                    value={name}
                                />
                            </div>
                        ) : (
                            <div></div>
                        )}
                        {changeRegisterLogin ? (
                            <div className="d-flex flex-column">
                                <button type="submit" className="btn btn-primary w-25 m-auto my-4">Sign Up</button>
                                <a onClick={() => setChangeRegisterLogin(false)} className="text-center"> Already have an account! </a>
                            </div>
                        ) : (
                            <div className="d-flex flex-column">
                                <button type="submit" className="btn btn-success w-25 m-auto my-4">Login</button>
                                <a onClick={() => setChangeRegisterLogin(true)} className="text-center"> Create Acount? </a>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login


