// Importamos createSlice y PayloadAction desde Redux Toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definimos la interfaz que representará el estado de autenticación
interface AuthState {
    user_id: string | null;   // ID del usuario (puede ser null si no está autenticado)
    userName: string | null;  // Nombre del usuario
    userEmail: string | null; // Correo del usuario
    isAuthenticated: boolean; // Estado de autenticación (true si el usuario ha iniciado sesión, false en caso contrario)
}

// Definimos el estado inicial del usuario
const initialState: AuthState = {
    user_id: null,        // No hay usuario logueado al inicio
    userName: null,       // No hay nombre registrado al inicio
    userEmail: null,      // No hay email registrado al inicio
    isAuthenticated: false // El usuario no está autenticado al inicio
};

// Creamos un slice de Redux llamado "auth" para manejar la autenticación
const authSlice = createSlice({
    name: 'auth', // Nombre del slice, usado internamente en Redux
    initialState, // Estado inicial del slice
    reducers: {   // Definimos las funciones que actualizan el estado

        // Acción para establecer el usuario después de iniciar sesión
        setUser(state, action: PayloadAction<{ user_id: string; userName: string; userEmail: string }>) {
            state.user_id = action.payload.user_id;   // Guardamos el ID del usuario
            state.userName = action.payload.userName; // Guardamos el nombre del usuario
            state.userEmail = action.payload.userEmail; // Guardamos el email del usuario
            state.isAuthenticated = true; // Marcamos que el usuario está autenticado
        },

        // Acción para cerrar sesión y limpiar el estado del usuario
        logoutUser(state) {
            return initialState; // Reiniciamos el estado al valor inicial (usuario no autenticado)
        },
    },
});

// Exportamos las acciones para que puedan ser usadas en el resto de la aplicación
export const { setUser, logoutUser } = authSlice.actions;

// Exportamos el reducer para ser utilizado en el store de Redux
export default authSlice.reducer;


/*📌 Explicación general
¿Qué es createSlice?

createSlice es una función de Redux Toolkit que simplifica la creación de un slice (una parte del estado global de Redux).
Define el estado inicial, acciones y reducer en un solo lugar.
¿Qué hace setUser?

Se ejecuta cuando el usuario inicia sesión correctamente.
Toma los datos del usuario (ID, nombre y correo) y los almacena en Redux.
Cambia isAuthenticated a true para indicar que el usuario ha iniciado sesión.
¿Qué hace logoutUser?

Se ejecuta cuando el usuario cierra sesión.
Restablece el estado al valor inicial (initialState), eliminando los datos del usuario.
¿Por qué usamos PayloadAction?

PayloadAction se usa para definir el tipo de datos que se reciben en la acción.
En setUser, espera un objeto con user_id, userName y userEmail.
¿Cómo se usa en la aplicación?

Cuando un usuario inicia sesión correctamente, se despacha setUser(datosUsuario).
Cuando un usuario cierra sesión, se despacha logoutUser().

🎯 Conclusión
Este código maneja la autenticación del usuario con Redux Toolkit de manera eficiente.
✅ Permite almacenar los datos del usuario después del login.
✅ Mantiene un estado centralizado para toda la aplicación.
✅ Limpia el estado correctamente al cerrar sesión.

*/ 