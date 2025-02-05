import React, { useState } from 'react'
import Menu from '../components/Menu'
import Display from '../components/Display'
import ps2 from '../assets/imgs/control_ps2.jpeg'

/*
📌 Relación entre los componentes (My_collection.tsx, Menu.tsx y Display.tsx)

El componente PADRE es My_collection.tsx, ya que es el que administra el estado selectedPlatform y se lo pasa 
como prop tanto a Menu.tsx como a Display.tsx.*/ 

const My_collection = () => {

    // permite actualizar el estado cuando el usuario selecciona una plataforma en Menu.tsx.
    const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
    
    return (
        <>
            <div className='container-fluid My_colection d-flex justify-content-center align-items-center' style={{
                backgroundImage: `url(${ps2})`,
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
                    <div className="row">
                        <div className='col-md-3 card p-2 me-4 container-menu' style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                             {/* Se renderiza el componente Menu y se le pasa la función setSelectedPlatform como prop */}
                            <Menu onSelectPlatform={setSelectedPlatform}/>
                        </div>
                        <div className='col-md-8 card p-2' style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                            {/* Se renderiza el componente Display y se le pasa selectedPlatform como prop */}
                            <Display selectedPlatform={selectedPlatform}/>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default My_collection

// Nota: cada vez que selecciono una plataforma cambiar el fondo y poner una imagen de fondo con el mando de esa plataforma...

/*📌 Explicación del flujo de datos
1️⃣ El usuario selecciona una plataforma en Menu.tsx.

Se ejecuta onSelectPlatform("PlayStation").
setSelectedPlatform("PlayStation") actualiza el estado en My_collection.tsx.
2️⃣ My_collection.tsx pasa selectedPlatform a Display.tsx.

Ahora Display.tsx recibe "PlayStation" y filtra los juegos de esa plataforma.
3️⃣ Si el usuario selecciona "Ver colección" en Menu.tsx,

setSelectedPlatform(null) cambia el estado en My_collection.tsx.
Display.tsx muestra los juegos de la colección personal del usuario.

📌 Resumen final
1️⃣ My_collection.tsx es el componente padre que maneja el estado selectedPlatform.
2️⃣ Menu.tsx permite seleccionar la plataforma y actualizar el estado en My_collection.tsx.
3️⃣ Display.tsx recibe selectedPlatform y muestra los juegos filtrados o la colección del usuario.
4️⃣ El fondo cambia dinámicamente en My_collection.tsx según la plataforma seleccionada.*/ 






/*📌 Agregar cambio de fondo dinámico
Para cambiar la imagen de fondo según la plataforma seleccionada, podemos modificar My_collection.tsx agregando una estructura condicional:

Paso 1: Agregar imágenes de fondo por plataforma
tsx
Copiar
Editar
import ps2 from '../assets/imgs/control_ps2.jpeg';
import xbox from '../assets/imgs/control_xbox.jpeg';
import nintendo from '../assets/imgs/control_nintendo.jpeg';
Paso 2: Definir el fondo dinámico en My_collection.tsx
tsx
Copiar
Editar
const backgroundImage = selectedPlatform === "PlayStation" ? ps2
  : selectedPlatform === "Xbox" ? xbox
  : selectedPlatform === "Nintendo" ? nintendo
  : ps2; // Imagen por defecto
Paso 3: Usar backgroundImage en el estilo del contenedor
tsx
Copiar
Editar
<div className='container-fluid My_colection d-flex justify-content-center align-items-center' 
  style={{
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    backgroundAttachment: 'fixed'
  }}>
✅ Ahora, cada vez que el usuario seleccione una plataforma, la imagen de fondo cambiará automáticamente.*/ 