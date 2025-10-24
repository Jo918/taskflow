import pool from '../config/db.js';

const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  try {
    await pool.query(query);
    console.log('Tabla "users" creada o ya existente.');
  } catch (err) {
    console.error('Error creando la tabla users:', err.message);
  } finally {
    pool.end();
  }
};

createUsersTable();
