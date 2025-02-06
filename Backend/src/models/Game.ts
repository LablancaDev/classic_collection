import mongoose, { Schema, Document } from "mongoose";

// Interfaz para los juegos en la base de datos
export interface IGame extends Document {
  name: string;
  platform: string;
  coverUrl?: string;
}

// Esquema de juegos
const gameSchema = new Schema<IGame>({
  name: { type: String, required: true },
  platform: { type: String, required: true },
  coverUrl: { type: String }, // URL opcional para la portada del juego
});

// Modelo
const Game = mongoose.model<IGame>("Game", gameSchema);

export default Game;


/*Sí, puedes mantener los juegos dentro de `myCollection` en el modelo de `User` y añadirles características adicionales como descripciones, 
puntuaciones de revistas y de los usuarios, entre otras. Sin embargo, es importante considerar algunas implicaciones para asegurarte de que 
la solución sea escalable y fácil de mantener.

### Opción 1: Mantener los juegos dentro de `myCollection` (como lo tienes ahora)
Podrías extender la estructura de los objetos dentro del array `myCollection` para agregar más propiedades. Por ejemplo, puedes incluir puntuaciones, 
descripciones y otros detalles directamente dentro del objeto del juego en cada usuario.

#### Ejemplo de cómo podrías hacerlo:

```ts
// Esquema extendido de los juegos dentro de myCollection
interface IGame {
  name: string;             // Nombre del juego
  dateAdded: Date;          // Fecha de adición
  description?: string;     // Descripción del juego
  ratingFromMagazine?: number; // Puntuación de revistas
  userRating?: number;      // Puntuación del usuario
  coverUrl?: string;        // URL de la portada
}
```

En este caso, cada juego en `myCollection` sería un objeto con más propiedades, por ejemplo:

```json
{
  "name": "The Last of Us",
  "dateAdded": "2021-06-15T00:00:00.000Z",
  "description": "An action-adventure game set in a post-apocalyptic world.",
  "ratingFromMagazine": 9.5,
  "userRating": 8.7,
  "coverUrl": "https://example.com/cover.jpg"
}
```

#### Beneficios:
1. **Simplicidad**: Si no necesitas realizar consultas complejas sobre los juegos, mantener todo dentro de `myCollection` es simple y directo. 
No necesitas crear una colección separada para los juegos.
2. **Accesibilidad rápida**: No necesitas hacer consultas adicionales para obtener los detalles del juego, ya que todos los datos están directamente 
en el documento del usuario.

#### Desventajas:
1. **Duplicación de datos**: Si varios usuarios agregan el mismo juego, cada uno tendrá una copia del juego con sus propios detalles, como puntuaciones. 
Esto podría generar redundancia.
2. **Escalabilidad**: Si en el futuro tienes muchos detalles para cada juego (por ejemplo, diferentes versiones del juego, múltiples puntuaciones de 
  diferentes fuentes, etc.), esto puede hacer que el documento de usuario sea muy grande, lo que afectaría el rendimiento.
3. **Consultas complejas**: Si deseas realizar consultas sobre los juegos (por ejemplo, encontrar todos los juegos con una puntuación superior a 8), 
tendrás que hacerlo dentro de cada `myCollection`, lo que podría ser menos eficiente a medida que crezca el número de usuarios y juegos.

---

### Opción 2: Mantener los juegos en una colección separada (`Game`), y solo referenciar los juegos en `myCollection`
La otra opción sería usar el modelo `Game` como lo tenías originalmente. En este caso, podrías almacenar los juegos en una colección separada y luego 
almacenar solo las referencias a esos juegos dentro de `myCollection` en el modelo de `User`.

#### Ejemplo de estructura:

1. **Modelo `Game` (extendido)**: Añadir descripciones, puntuaciones y otros atributos relevantes a los juegos.

```ts
// Modelo extendido para los juegos
interface IGame extends Document {
  name: string;
  platform: string;
  coverUrl?: string;
  description?: string;
  ratingFromMagazine?: number;
  userRating?: number;
}

// Esquema para el modelo Game
const gameSchema = new Schema<IGame>({
  name: { type: String, required: true },
  platform: { type: String, required: true },
  coverUrl: { type: String },
  description: { type: String },
  ratingFromMagazine: { type: Number },
  userRating: { type: Number },
});

// Modelo Game
const Game = mongoose.model<IGame>("Game", gameSchema);
```

2. **Modelo `User` (referencias a juegos)**: En lugar de almacenar los juegos completos dentro de `myCollection`, solo almacenarías las referencias
a los juegos que están en la colección `Game`.

```ts
interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  myCollection: [{ type: Schema.Types.ObjectId, ref: 'Game' }]; // Referencias a juegos
}
```

3. **Añadir juegos a `myCollection`**:
Cuando un usuario agrega un juego a su colección, simplemente se guarda el `_id` del juego en `myCollection` en lugar de duplicar toda la información 
del juego.

#### Beneficios:
1. **Evitar la duplicación**: Los juegos se almacenan solo una vez en la colección `Game`, y los usuarios solo almacenan referencias a esos juegos. 
Esto ahorra espacio y evita la redundancia.
2. **Consultas más flexibles**: Si deseas realizar consultas sobre los juegos, como encontrar todos los juegos con una puntuación superior a un valor 
determinado, puedes hacerlo en la colección `Game` sin tener que iterar sobre todas las colecciones de los usuarios.
3. **Escalabilidad**: Si en el futuro necesitas más atributos en los juegos (por ejemplo, reseñas de diferentes revistas o varias puntuaciones), puedes 
agregarlos fácilmente al modelo `Game` sin afectar la estructura de la colección de cada usuario.

#### Desventajas:
1. **Complejidad adicional**: Necesitarás realizar consultas adicionales con `populate` para obtener la información completa de los juegos de la colección 
de un usuario. Esto puede agregar un poco de complejidad.
2. **Dependencia entre colecciones**: Si el juego se elimina de la colección `Game`, la referencia en `myCollection` de cada usuario podría quedar 
obsoleta, por lo que necesitarías manejar adecuadamente la eliminación de los juegos.

---

### ¿Cuál opción elegir?

- **Si solo deseas almacenar información básica de cada juego para cada usuario**, y no necesitas realizar consultas complejas o almacenar mucha 
información adicional, **mantener los juegos dentro de `myCollection`** es más simple y suficiente.
  
- **Si deseas poder realizar consultas más complejas, evitar la duplicación de juegos y manejar más atributos por juego**, te recomendaría usar una 
colección separada (`Game`) y almacenar solo las referencias en `myCollection` dentro del modelo `User`.

Ambas soluciones son válidas, y la elección depende de tus necesidades actuales y futuras. Si crees que los juegos van a tener muchas características
adicionales y que realizarás consultas más avanzadas, **la segunda opción (referencias en `myCollection`) sería más adecuada**.

*/ 