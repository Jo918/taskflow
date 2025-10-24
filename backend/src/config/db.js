import dotenv from 'dotenv';
dotenv.config();

import pkg from 'pg';
import { parse } from 'pg-connection-string';
const { Pool } = pkg;

const config = parse(process.env.DATABASE_URL);

const pool = new Pool({
  user: config.user,
  password: config.password,
  host: config.host,
  port: config.port,
  database: config.database,
  ssl: config.ssl ?? false
});

export default pool;
