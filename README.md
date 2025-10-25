# TaskFlow – Prueba Técnica (Backend Full-Stack)

## Descripción general

Backend desarrollado como parte de la prueba técnica **TaskFlow**, un sistema de gestión de tareas personales.
Incluye autenticación JWT, manejo de usuarios, CRUD de tareas, protección de rutas y creación automática de tablas mediante script de inicialización.

---

## Requisitos previos

- Node.js v18 o superior
- PostgreSQL instalado y corriendo en localhost
- npm o yarn

---

## Estructura del proyecto

```
backend/
 ├── src/
 │   ├── app.js
 │   ├── config/
 │   │   └── db.js
 │   ├── controllers/
 │   │   ├── authController.js
 │   │   └── taskController.js
 │   ├── middlewares/
 │   │   └── authMiddleware.js
 │   ├── routes/
 │   │   ├── authRoutes.js
 │   │   └── taskRoutes.js
 │   └── db/
 │       └── init.js
 ├── package.json
 ├── .env.example
 └── README.md
```

---

## Variables de entorno (.env)

```
PORT=4000
DATABASE_URL=postgres://postgres:tu_contraseña@localhost:5432/taskflow
JWT_SECRET=clave_secreta_segura
BCRYPT_SALT_ROUNDS=10
CORS_ORIGIN=http://localhost:4200
```

---

## Instalación y ejecución

1. Clonar el repositorio.
2. Entrar en la carpeta del backend:

   ```
   cd backend
   ```

3. Instalar dependencias:

   ```
   npm install
   ```

4. Crear las tablas iniciales (users y tasks):

   ```
   node src/db/init.js
   ```

5. Iniciar el servidor en modo desarrollo:

   ```
   npm run dev
   ```

El backend se ejecutará en:
http://localhost:4000

---

## Endpoints principales

### 1. Autenticación

**POST /api/auth/register**
Registra un nuevo usuario.
Body (JSON):
```
{
  "name": "Johan",
  "email": "johan@test.com",
  "password": "12345"
}
```

**POST /api/auth/login**
Inicia sesión y devuelve un token JWT.
Body (JSON):
```
{
  "email": "johan@test.com",
  "password": "12345"
}
```

**GET /api/auth/me**
Devuelve los datos del usuario autenticado.
Headers:
```
Authorization: Bearer <token>
```

---

### 2. Tareas

Todas las rutas de tareas requieren token JWT.

**POST /api/tasks**
Crea una nueva tarea.
Body:
```
{
  "title": "Aprender Angular",
  "description": "Conectar frontend con API",
  "priority": "alta"
}
```

**GET /api/tasks**
Lista todas las tareas del usuario autenticado.
Headers:
```
Authorization: Bearer <token>
```

**GET /api/tasks/status/:status**
Filtra tareas por estado: por hacer, en progreso o completada.
Ejemplo:
```
GET /api/tasks/status/completada
```

**PUT /api/tasks/status**
Actualiza el estado de una tarea.
Body:
```
{
  "id": 1,
  "status": "completada"
}
```

**DELETE /api/tasks/:id**
Elimina una tarea existente.
Ejemplo:
```
DELETE /api/tasks/3
```

---

## Script de inicialización

El archivo `src/db/init.js` crea automáticamente las tablas necesarias para ejecutar el proyecto, igualmente crea automáticamente los datos de ejemplo al ejecutarse.

Esto permite probar la API sin necesidad de registrar usuarios manualmente.

### Tablas

- users
- tasks (relacionada con users)

Ejecutar:
```
node src/db/init.js
```

---

## Datos de prueba incluidos

### Usuarios disponibles
| Nombre | Email | Contraseña |
|---------|--------|------------|
| Usuario Demo 1 | demo1@taskflow.com | 12345 |
| Usuario Demo 2 | demo2@taskflow.com | 12345 |

Cada usuario tiene 10 tareas asociadas con distintas prioridades y estados.

---

## Notas

- Todas las rutas de tareas y perfil requieren token JWT.
- Las contraseñas se almacenan con hash usando bcrypt.
- Se usa PostgreSQL como base de datos principal.
- El CORS está configurado para permitir peticiones desde Angular (puerto 4200).

---

## Autor

Johan Esteban Gutiérrez Garcés
Desarrollador Full-Stack
