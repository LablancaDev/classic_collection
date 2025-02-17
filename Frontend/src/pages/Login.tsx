import React, { useState } from 'react'
import japanese from '../assets/imgs/Japanese-Art.jpg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Login = () => {

     // Obtener usuario desde Redux
     const userLoggedIn = useSelector((state: RootState) => state.auth.user_id);

    const [changeRegisterLogin, setChangeRegisterLogin] = useState(false)

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value.trim()); //Usa .trim() para evitar espacios vacíos en los inputs. 
    }

    const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value.trim());
    }

    const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value.trim());
    }

    /*
    * Validaciones en los Inputs antes de Enviar Datos
    Evita formatos incorrectos o inputs vacíos con validaciones en el frontend antes de hacer la petición a la API.
    */
    const validateForm = (): boolean => {

        if (userLoggedIn) {
            toast.error("⚠️ Ya hay una sesión activa. Cierra sesión antes de continuar.", {
                position: "top-right", autoClose: 3000
            });
            return false;
        }

        if (!email || !password) {
            toast.error("Todos los campos son obligatorios", { position: "top-right", autoClose: 3000 });
            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("El formato del email no es válido", { position: "top-right", autoClose: 3000 });
            return false;
        }

        if (password.length < 6) {
            toast.error("La contraseña debe tener al menos 6 caracteres", { position: "top-right", autoClose: 3000 });
            return false;
        }

        if (changeRegisterLogin && name.length < 3) {
            toast.error("El nombre debe tener al menos 3 caracteres", { position: "top-right", autoClose: 3000 });
            return false;
        }

        return true;
    };


    // FUNCTION REGISTER 

    const handleRegister = async (e: React.FormEvent) => {

        e.preventDefault()
        if (!validateForm()) return;

        try {

            await axios.post('http://localhost:5000/api/userRegister', {
                userName: name,
                email: email,
                password: password,
            });

            // Notificación emergente toast
            toast.success('✅ Registro exitoso!', {
                position: 'top-right',
                autoClose: 3000, // 3 segundos
            });

            // Limipiar Datos
            // setName('')
            // setPassword('');
            // setEmail('');

            // alert('Registro Correcto!');

            console.log('Registro Correcto!, Datos Guardados: ', name, password, email)


        } catch (error: any) {
            toast.error(`${error.response?.data.message || 'Error en el registro'}`, {
                position: 'top-right',
                autoClose: 3000,
            });
        }

    }

    // FUNCTION LOGIN

    const handleLogin = async (e: React.FormEvent) => {

        e.preventDefault();

        if (userLoggedIn) {
            toast.error("⚠️ Ya hay una sesión activa. Cierra sesión antes de continuar.", { 
                position: "top-right", autoClose: 3000 
            });
            return;
        }

        // if (!validateForm()) return;

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

            // alert('Login Correto!');

            // Notificación emergente toast
            toast.success('✅ Login exitoso!', {
                position: 'top-right',
                autoClose: 3000,
            });

            // Redirigir al usuario a la página de home
            navigate('/home');

        } catch (error: any) {
            toast.error(`${error.response?.data.message || 'Error en el login'}`, {
                position: 'top-right',
                autoClose: 3000,
            });
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
            <ToastContainer />
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


