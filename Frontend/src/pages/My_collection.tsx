import React, { useState } from 'react'
import Menu from '../components/Menu'
import Display from '../components/Display'
import ps2 from '../assets/imgs/control_ps2.jpeg'
import xbox from '../assets/imgs/xbox.png'
import nintendo from '../assets/imgs/Nintendo.png'

/*
📌 Relación entre los componentes (My_collection.tsx, Menu.tsx y Display.tsx)

El componente PADRE es My_collection.tsx, ya que es el que administra el estado selectedPlatform y se lo pasa 
como prop tanto a Menu.tsx como a Display.tsx.*/

const My_collection = () => {

  // permite actualizar el estado cuando el usuario selecciona una plataforma en Menu.tsx.
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  // Agregaremos un nuevo estado viewCollection para controlar si se muestra la colección del usuario.
  const [viewCollection, setViewCollection] = useState<boolean>(false);

  // Función para activar la vista de la colección
  const handleViewCollection = () => {
    setSelectedPlatform(null);  // Desactiva la selección de plataforma
    setViewCollection(true);    // Activa la vista de la colección
    // setViewCollection(true);-> My_collection.tsx se vuelve a renderizar, informando a Display.tsx que debe cargar la colección.
  };

  // Cambia dinámicamente el fondo según la plataforma seleccionada. REVISAR IMAGENES DEMASIADO GRANDES...PONER IMG DE CONSOLAS
  const backgroundImage = selectedPlatform === "PlayStation" ? ps2
    : selectedPlatform === "Xbox" ? xbox
      : selectedPlatform === "Nintendo" ? nintendo
        : ps2; // Imagen por defecto


  return (
    <>
      <div className='container-fluid My_colection d-flex justify-content-center align-items-center' style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundAttachment: 'fixed'
      }}
      >
        <div className='card p-4 m-auto mx-2 d-flex flex-column' style={{
          // maxWidth: '900px',   
          width: '100%',
          borderRadius: '15px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)', // Color de fondo con transparencia
          zIndex: 2, // Para estar encima del overlay
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        }}>
          <div className='text-center mt-2 mb-4'>
            <h3 className='text-warning'>Gestiona tu colección de videojuegos, búscalos y crea tu colección definitiva!</h3>
          </div>
          <div className="row">
            <div className='col-md-3 card p-2 me-4 container-menu' style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
              {/* Se renderiza el componente Menu y se le pasa la función setSelectedPlatform como prop */}
              <Menu onSelectPlatform={setSelectedPlatform} onViewCollection={handleViewCollection} />
            </div>
            <div className='col-md-8 card p-2' style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
              {/* Se renderiza el componente Display y se le pasa selectedPlatform como prop */}
              <Display selectedPlatform={selectedPlatform} viewCollection={viewCollection} setViewCollection={setViewCollection} />
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default My_collection

/*

### 📌 **Explicación Detallada del Flujo de Ejecución en la Aplicación**  

## 📌 **1️⃣ Estructura General de la Aplicación**  

La aplicación tiene **un componente padre y dos hijos principales**:

1. **`My_collection.tsx` (Componente Padre)**
   - Controla el estado de la plataforma seleccionada (`selectedPlatform`).
   - Administra la visualización de la colección del usuario (`viewCollection`).
   - Renderiza `Menu.tsx` y `Display.tsx`, pasándoles las props necesarias.
   - Cambia dinámicamente el fondo según la plataforma seleccionada.

2. **`Menu.tsx` (Componente Hijo)**
   - Permite al usuario **seleccionar una plataforma** o **ver su colección**.
   - Llama a funciones de `My_collection.tsx` para actualizar los estados globales.
   - Informa a `Display.tsx` sobre qué juegos debe mostrar.

3. **`Display.tsx` (Componente Hijo)**
   - **Muestra los juegos** de la API según la plataforma seleccionada.
   - **Carga la colección del usuario** si `viewCollection` es `true`.
   - Permite **buscar juegos** en la lista de juegos cargados.
   - **Agrega juegos a la colección del usuario**.

---

## 🚀 **2️⃣ Flujo de Ejecución Completo (Paso a Paso)**  

### **🟢 Paso 1: Renderización Inicial de `My_collection.tsx`**
- Cuando se carga la aplicación, se ejecuta `My_collection.tsx`.
- Se **definen dos estados clave**:
  ```tsx
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [viewCollection, setViewCollection] = useState<boolean>(false);
  ```
  - `selectedPlatform`: Almacena la plataforma seleccionada (`"PlayStation"`, `"Xbox"`, `"Nintendo"` o `null`).
  - `viewCollection`: Indica si el usuario está viendo su colección.

- Se renderiza el **fondo dinámico**:
  ```tsx
  const backgroundImage = selectedPlatform === "PlayStation" ? ps2
    : selectedPlatform === "Xbox" ? xbox
    : selectedPlatform === "Nintendo" ? nintendo
    : ps2; // Imagen por defecto
  ```
  - Dependiendo de `selectedPlatform`, cambia la imagen de fondo.

- **Se renderiza el layout de la aplicación**:
  ```tsx
  <div className='row'>
    <div className='col-md-3'>
      <Menu onSelectPlatform={setSelectedPlatform} onViewCollection={handleViewCollection} />
    </div>
    <div className='col-md-8'>
      <Display selectedPlatform={selectedPlatform} viewCollection={viewCollection} setViewCollection={setViewCollection} />
    </div>
  </div>
  ```
  - Se renderiza `Menu.tsx`, pasándole `setSelectedPlatform` y `handleViewCollection`.
  - Se renderiza `Display.tsx`, pasándole `selectedPlatform` y `viewCollection`.

---

### **🟢 Paso 2: Interacción en `Menu.tsx`**  
Cuando el usuario interactúa con `Menu.tsx`, pueden ocurrir dos cosas:

#### **✅ Opción 1: Seleccionar una Plataforma**  
```tsx
<button onClick={() => onSelectPlatform("PlayStation")}>PlayStation</button>
```
- Si el usuario hace clic en "PlayStation":
  1. Se ejecuta `onSelectPlatform("PlayStation")`, que **llama a `setSelectedPlatform("PlayStation")` en `My_collection.tsx`**.
  2. **El estado `selectedPlatform` cambia a `"PlayStation"`**.
  3. `My_collection.tsx` se **vuelve a renderizar**, actualizando `Display.tsx`.

#### **✅ Opción 2: Ver la Colección del Usuario**  
```tsx
<button onClick={onViewCollection}>Ver mi colección</button>
```
- Si el usuario hace clic en "Ver mi colección":
  1. Se ejecuta `handleViewCollection()` en `My_collection.tsx`, que:
     ```tsx
     setSelectedPlatform(null); // Desactiva la selección de plataforma
     setViewCollection(true); // Activa la vista de la colección
     ```
  2. **El estado `viewCollection` cambia a `true`**.
  3. `My_collection.tsx` se **vuelve a renderizar**, informando a `Display.tsx` que debe cargar la colección.

---

### **🟢 Paso 3: Carga de Juegos en `Display.tsx`**  
Cuando cambia `selectedPlatform` o `viewCollection`, `Display.tsx` responde de la siguiente manera:

#### **✅ Opción 1: Cargar Juegos de la API**  
Si `selectedPlatform` tiene un valor (`"PlayStation"`, `"Xbox"`, `"Nintendo"`):
```tsx
useEffect(() => {
  if (selectedPlatform) {
    setViewCollection(false);
    setGames([]); // Limpia la lista antes de cargar nuevos juegos

    async function fetchFilteredGames() {
      const response = await fetch(`http://localhost:5000/api/dataGames?platform=${selectedPlatform}`);
      const data = await response.json();
      setGames(data);
    }

    fetchFilteredGames();
  }
}, [selectedPlatform]);
```
- **Cada vez que cambia `selectedPlatform`**, se ejecuta este `useEffect`:
  1. Se **limpia la lista de juegos** (`setGames([])`).
  2. Se **hace una petición a la API** (`fetch("...")`).
  3. Se **actualiza `games` con los datos de la API** (`setGames(data)`).
  4. **Se renderizan los juegos en la interfaz**.

---

#### **✅ Opción 2: Cargar la Colección del Usuario**  
Si `viewCollection` es `true`, se carga la colección del usuario:
```tsx
useEffect(() => {
  if (viewCollection) {
    fetch(`http://localhost:5000/api/myCollection?user_id=${user_id}`)
      .then((response) => response.json())
      .then((data) => setMyCollection(data));
  }
}, [viewCollection]);
```
- **Cada vez que `viewCollection` cambia a `true`**, se ejecuta este `useEffect`:
  1. Se hace una petición a la API (`fetch("...")`).
  2. Se actualiza `myCollection` con los juegos del usuario.
  3. **Se renderizan los juegos guardados** en la interfaz.

---

### **🟢 Paso 4: Mostrar Juegos en la UI**  
En la interfaz, `Display.tsx` muestra los juegos cargados en `games` o `myCollection`:

```tsx
const displayedGames = viewCollection ? myCollection : games;
return (
  <div>
    {displayedGames.map((game) => (
      <div key={game.name}>
        <img src={game.cover?.url ? `https:${game.cover.url}` : game.coverUrl} />
      </div>
    ))}
  </div>
);
```
- **Si `viewCollection` es `true`**, se muestran los juegos de `myCollection`.
- **Si `selectedPlatform` tiene un valor**, se muestran los juegos de la API.

---

## 🔥 **Resumen Final**
1. **`My_collection.tsx` controla el estado global** (`selectedPlatform` y `viewCollection`).
2. **`Menu.tsx` permite seleccionar una plataforma o ver la colección**, actualizando los estados en `My_collection.tsx`.
3. **`Display.tsx` se actualiza dinámicamente**:
   - Si hay una plataforma seleccionada, carga juegos de la API.
   - Si `viewCollection` es `true`, carga la colección del usuario.

📌 **Conclusión:** La aplicación funciona de forma **reactiva** y **dinámica**, asegurando que los juegos correctos se muestren en función de la selección del usuario. 🚀

*/ 