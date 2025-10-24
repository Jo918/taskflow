# TaskFlow – Prueba Técnica (Full-Stack)

Proyecto base para la prueba técnica: una aplicación web full-stack para gestión de tareas personales. Incluye autenticación JWT, CRUD de tareas y filtros por estado.

---

## Objetivos

- Registro e inicio de sesión con JWT (Access Token).
- Perfil básico de usuario autenticado.
- CRUD de tareas (crear, listar, actualizar estado y eliminar).
- Filtrar tareas por estado (Por hacer, En progreso, Completada).
- Validación básica, manejo de errores y rutas protegidas.

---

## Stack Tecnológico

- **Backend:** Node.js + Express + PostgreSQL + JWT + bcrypt.
- **Frontend:** Angular + HttpClient + Reactive Forms.
- **Otras herramientas:** dotenv, CORS, nodemon.

---

## Estructura del Proyecto

```text
taskflow/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/
│   │   │   ├── tasks/
│   │   │   ├── core/
│   │   │   └── app-routing.module.ts
│   ├── environment/
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Variables de Entorno

### Backend – .env

```env
PORT=4000
DATABASE_URL=postgres://user:password@localhost:5432/taskflow
JWT_SECRET=super_secret_key
BCRYPT_SALT_ROUNDS=10
CORS_ORIGIN=http://localhost:4200
```

### Frontend – environment.ts

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:4000'
};
```

---

## Instalación y Ejecución

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## Notas

Este es el commit inicial del proyecto. Contiene la estructura base, README y configuración básica. En los siguientes commits se añadirá la configuración del servidor Express, autenticación y CRUD de tareas.

---

## Autor

Johan Esteban Gutiérrez Garcés

Desarrollador Full-Stack
