// Importamos configureStore para crear el store de Redux
import { configureStore } from "@reduxjs/toolkit";
// Importamos persistStore y persistReducer para manejar la persistencia del estado
import { persistStore, persistReducer } from "redux-persist";
// Importamos storage, que usará localStorage para almacenar el estado persistente
import storage from "redux-persist/lib/storage";
// Importamos el slice de autenticación (authSlice) que contiene el reducer y las acciones
import authSlice from "./authSlice";


// Configuración de persistencia
const persistConfig = {
    key: "auth", // Clave bajo la cual se guardará el estado persistido en localStorage
    storage,     // Define el almacenamiento, en este caso localStorage
};

// Crea un reducer persistente para auth, permitiendo mantener la sesión aunque se recargue la página
const persistedAuthReducer = persistReducer(persistConfig, authSlice);

// Creamos el store de Redux usando configureStore
const store = configureStore({
    reducer: {
        auth: persistedAuthReducer, // Agregamos el reducer persistente de autenticación
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Desactiva la verificación de serialización para evitar advertencias en la consola
        }),
});

// Crea el persistor, que se encargará de sincronizar el store con el almacenamiento persistente
const persistor = persistStore(store);

// Definimos los tipos RootState y AppDispatch para facilitar el uso de TypeScript en Redux
export type RootState = ReturnType<typeof store.getState>; // Obtiene el tipo del estado global
export type AppDispatch = typeof store.dispatch; // Obtiene el tipo de la función dispatch

// Exportamos store y persistor para que puedan ser usados en la aplicación
export { store, persistor };


/*📌 Explicación general
¿Qué es redux-persist y por qué lo usamos?

redux-persist permite almacenar el estado de Redux en localStorage o sessionStorage.
Asegura que la sesión del usuario se mantenga incluso después de recargar la página.
¿Cómo funciona la persistencia en este código?

Se define persistConfig con la clave "auth" y storage como localStorage.
persistReducer envuelve el reducer de autenticación (authSlice) para hacerlo persistente.
persistStore(store) se encarga de sincronizar el estado de Redux con localStorage.
¿Por qué se desactiva serializableCheck?

redux-persist almacena estados con objetos que pueden no ser serializables.
Redux muestra advertencias cuando hay objetos no serializables en el estado.
Desactivamos esta verificación con serializableCheck: false para evitar estos mensajes en la consola.
¿Cómo se usa en la aplicación?

store se proporciona al Provider de Redux en App.tsx.
persistor se usa en PersistGate para restaurar el estado almacenado.
🎯 Conclusión
Este código configura correctamente Redux con persistencia para mantener la sesión del usuario.
✅ Guarda la sesión en localStorage.
✅ Recupera la sesión automáticamente al recargar la página.
✅ Maneja el estado de autenticación de forma centralizada.*/ 