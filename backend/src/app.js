import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import pool from './config/db.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN }));

try {
  const res = await pool.query('SELECT NOW()');
  console.log('Base de datos conectada:', res.rows[0]);
} catch (err) {
  console.error('Error de conexión inicial a la BD:', err.message);
}

app.use('/api', routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
