import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const createTablesAndSeed = async () => {
  try {
    // Crear tablas si no existen
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description TEXT,
        priority VARCHAR(10) CHECK (priority IN ('alta', 'media', 'baja')) DEFAULT 'media',
        status VARCHAR(20) CHECK (status IN ('por hacer', 'en progreso', 'completada')) DEFAULT 'por hacer',
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log('Tablas creadas o verificadas.');

    // Definir usuarios demo
    const demoUsers = [
      { name: 'Usuario Demo 1', email: 'demo1@taskflow.com', password: '12345' },
      { name: 'Usuario Demo 2', email: 'demo2@taskflow.com', password: '12345' }
    ];

    // Crear usuarios si no existen
    for (const user of demoUsers) {
      const existingUser = await pool.query(`SELECT * FROM users WHERE email = $1`, [user.email]);

      if (existingUser.rows.length === 0) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const result = await pool.query(
          `INSERT INTO users (name, email, password)
           VALUES ($1, $2, $3)
           RETURNING id, name, email;`,
          [user.name, user.email, hashedPassword]
        );

        const userId = result.rows[0].id;
        console.log(`Usuario creado: ${user.name} (${user.email})`);

        // Insertar 10 tareas de ejemplo
        const priorities = ['alta', 'media', 'baja'];
        const statuses = ['por hacer', 'en progreso', 'completada'];

        for (let i = 1; i <= 10; i++) {
          const title = `Tarea ${i} de ${user.name}`;
          const description = `Descripción de la tarea ${i} para ${user.name}`;
          const priority = priorities[Math.floor(Math.random() * priorities.length)];
          const status = statuses[Math.floor(Math.random() * statuses.length)];

          await pool.query(
            `INSERT INTO tasks (title, description, priority, status, user_id)
             VALUES ($1, $2, $3, $4, $5)`,
            [title, description, priority, status, userId]
          );
        }

        console.log(`10 tareas creadas para ${user.name}`);
      } else {
        console.log(`Usuario ${user.email} ya existe, no se insertaron duplicados.`);
      }
    }

    console.log('Inserción de datos completada correctamente.');
  } catch (err) {
    console.error('Error durante la creación o inserción:', err.message);
  } finally {
    pool.end();
  }
};

createTablesAndSeed();
