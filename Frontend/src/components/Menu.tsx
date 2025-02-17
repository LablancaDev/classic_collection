import React, { useState } from 'react';

import superNintendo from '../assets/imgs/Logo_SNES.png';
import nintendo from '../assets/imgs/Nintendo.png';
import wii from '../assets/imgs/1200px-Wii_logo.png';
import sega from '../assets/imgs/SEGA_logo.png';
import megadrive from '../assets/imgs/megadrive.svg';
import segaSaturn from '../assets/imgs/Sega_Saturn_USA_logo.svg.png';
import xbox360 from '../assets/imgs/xbox360.png';
import playstation from '../assets/imgs/PlayStation.png';
import playstation2 from '../assets/imgs/PlayStation2.png';
import playstation3 from '../assets/imgs/ps3-logo.png';
import playstation4 from '../assets/imgs/ps4-logo.webp';
import playstation5 from '../assets/imgs/ps5-logo.png';
import xbox from '../assets/imgs/microsoft-xbox.png';
import ps from '../assets/imgs/PlayStation.png';

// Definimos las propiedades esperadas en el componente Menu
interface MenuProps {
  onSelectPlatform: (platform: string | null) => void;
  onViewCollection: () => void; // Nueva prop para ver la colección mediante el botón del menu
}

// Componente funcional que recibe la función `onSelectPlatform` como prop, recupera la plataforma seleccionada, para usarla en el componente Display.tsx
const Menu: React.FC<MenuProps> = ({ onSelectPlatform, onViewCollection }) => {


  return (
    <div className="container-fluid menu-container" style={{ minHeight: '100vh' }}>
      <div className="dropdown mb-3" >
        <button
          className="btn btn-lg btn-dark dropdown-toggle w-100"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Plataformas
        </button>
        <ul
          className="dropdown-menu bg-dark text-center w-100"
          aria-labelledby="dropdownMenuButton"
          style={{ minWidth: "100%" }}
        >
          <li className="dropdown-item-container">
            <a className="dropdown-item d-flex justify-content-center" onClick={() => onSelectPlatform('Nintendo Entertainment System')} href="#">
              <img className="platform-icon" src={nintendo} alt="Nintendo" />
            </a>
          </li>
          <li className="dropdown-item-container">
            <a className="dropdown-item d-flex justify-content-center" onClick={() => onSelectPlatform('Sega Mega Drive/Genesis')} href="#">
              <img className="platform-icon" src={sega} alt="SEGA" />
            </a>
          </li>
          <li className="dropdown-item-container">
            <a className="dropdown-item d-flex justify-content-center" onClick={() => onSelectPlatform('PlayStation')} href="#">
              <img className="platform-icon" src={ps} alt="PlayStation" />
            </a>
          </li>
          <li className="dropdown-item-container">
            <a className="dropdown-item d-flex justify-content-center" onClick={() => onSelectPlatform('Xbox')} href="#">
              <img className="platform-icon" src={xbox} alt="Xbox" />
            </a>
          </li>
          <li className="dropdown-item-container">
            <a className="dropdown-item d-flex justify-content-center" onClick={() => onSelectPlatform('Android')} href="#">
              {/* <img className="platform-icon" src={xbox} alt="Android" /> */}Android
            </a>
          </li>
          <li className="dropdown-item-container">
            <a className="dropdown-item d-flex justify-content-center" onClick={() => onSelectPlatform(null)} href="#">
              Clear Filter
            </a>
          </li>
        </ul>
      </div>
      <div className="d-flex flex-column button-group">
        <div className="dropdown mb-3" >
          <button
            className="btn btn-lg btn-dark dropdown-toggle w-100"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Sistemas
          </button>
          <ul
            className="dropdown-menu bg-dark text-center w-100"
            aria-labelledby="dropdownMenuButton"
            style={{ minWidth: "100%" }}
          >
            <li className="dropdown-item-container">
              <a className="dropdown-item d-flex justify-content-center" onClick={() => onSelectPlatform('Nintendo Entertainment System')} href="#">
                <img className="platform-icon w-75" src={nintendo} alt="Nintendo" />
              </a>
            </li>
            <li className="dropdown-item-container">
              <a className="dropdown-item d-flex justify-content-center" onClick={() => onSelectPlatform('Super Nintendo Entertainment System')} href="#">
                <img className="platform-icon w-75" src={superNintendo} alt="superNintendo" />
              </a>
            </li>
            <li className="dropdown-item-container">
              <a className="dropdown-item d-flex justify-content-center" onClick={() => onSelectPlatform('Wii')} href="#">
                <img className="platform-icon " src={wii} alt="wii" />
              </a>
            </li>
            <li className="dropdown-item-container">
              <a className="dropdown-item d-flex justify-content-center" onClick={() => onSelectPlatform('Sega Mega Drive/Genesis')} href="#">
                <img className="platform-icon w-100" src={megadrive} alt="megadrive" />
              </a>
            </li>
            <li className="dropdown-item-container">
              <a className="dropdown-item d-flex justify-content-center" onClick={() => onSelectPlatform('Sega Saturn')} href="#">
                <img className="platform-icon w-100" src={segaSaturn} alt="segaSaturn" />
              </a>
            </li>
            <li className="dropdown-item-container">
              <a className="dropdown-item d-flex justify-content-center" onClick={() => onSelectPlatform('xbox 360')} href="#">
                <img className="platform-icon w-50" src={xbox360} alt="xbox360" />
              </a>
            </li>
            <li className="dropdown-item-container">
              <a className="dropdown-item d-flex justify-content-center" onClick={() => onSelectPlatform('PlayStation')} href="#">
                <img className="platform-icon w-50" src={playstation} alt="playstation" />
              </a>
            </li>
            <li className="dropdown-item-container">
              <a className="dropdown-item d-flex justify-content-center" onClick={() => onSelectPlatform('PlayStation 2')} href="#">
                <img className="platform-icon w-75" src={playstation2} alt="playstation2" />
              </a>
            </li>
            <li className="dropdown-item-container">
              <a className="dropdown-item d-flex justify-content-center" onClick={() => onSelectPlatform('PlayStation 3')} href="#">
                <img className="platform-icon" src={playstation3} alt="playstation3" />
              </a>
            </li>
            <li className="dropdown-item-container">
              <a className="dropdown-item d-flex justify-content-center" onClick={() => onSelectPlatform('PlayStation 4')} href="#">
                <img className="platform-icon" src={playstation4} alt="playstation4" />
              </a>
            </li>
            <li className="dropdown-item-container">
              <a className="dropdown-item d-flex justify-content-center" onClick={() => onSelectPlatform('PlayStation 5')} href="#">
                <img className="platform-icon" src={playstation5} alt="playstation5" />
              </a>
            </li>
          </ul>
        </div>
        {/* onViewCollection: se activa desde el botón del componente menú la vista de la colección   */}
        <button className="btn btn-lg btn-dark mt-2" onClick={onViewCollection}>Mi Colección</button>
        <button className="btn btn-lg btn-dark mt-2">Mis Consolas</button>
        <button className="btn btn-lg btn-dark mt-2">Añadir nuevo juego</button>
        <button className="btn btn-lg btn-dark mt-2">Juegos deseados</button>
      </div>
    </div>
  );
};

export default Menu;


/*📌 Explicación de las partes más importantes:
Dropdown de Plataformas:

Contiene un botón para mostrar una lista de plataformas como Nintendo, SEGA, Xbox y PlayStation.
Cada opción tiene una imagen y llama a onSelectPlatform con el nombre de la plataforma cuando el usuario hace clic.
Dropdown de Sistemas:

Similar al de plataformas, pero muestra sistemas específicos como Nintendo NES, Sega Mega Drive y PlayStation 5.
Botones adicionales:

"Mi Colección", "Añadir nuevo juego" y "Juegos deseados" están colocados debajo de los menús desplegables.
Función onSelectPlatform

Se pasa como prop al componente y permite filtrar los juegos según la plataforma o sistema seleccionado.
onSelectPlatform(null) limpia el filtro.
🎯 Conclusión
✅ Este código proporciona un menú interactivo para filtrar juegos por plataforma o sistema.
✅ Los dropdowns permiten al usuario seleccionar opciones de forma intuitiva.
✅ Se incluyen imágenes en algunas opciones para mejorar la experiencia visual.*/ 