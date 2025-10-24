import pool from '../config/db.js';

const createTables = async () => {
  const queryUsers = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  const queryTasks = `
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      description TEXT,
      priority VARCHAR(10) CHECK (priority IN ('alta', 'media', 'baja')) DEFAULT 'media',
      status VARCHAR(20) CHECK (status IN ('por hacer', 'en progreso', 'completada')) DEFAULT 'por hacer',
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  try {
    await pool.query(queryUsers);
    console.log('Tabla "users" verificada.');

    await pool.query(queryTasks);
    console.log('Tabla "tasks" creada o ya existente.');
  } catch (err) {
    console.error('Error creando las tablas:', err.message);
  } finally {
    pool.end();
  }
};

createTables();
