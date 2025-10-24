import pool from '../config/db.js';

// Crear tarea
export const createTask = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { title, description, priority } = req.body;

    const result = await pool.query(
      `INSERT INTO tasks (title, description, priority, user_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, description, priority || 'media', user_id]
    );

    res.status(201).json({ message: 'Tarea creada', task: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear tarea' });
  }
};

// Listar tareas del usuario
export const getTasks = async (req, res) => {
  try {
    const user_id = req.user.id;
    const result = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
};


// Filtrar tareas por estado (por hacer / en progreso / completada)
export const getTasksByStatus = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { status } = req.params;

    const result = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1 AND status = $2 ORDER BY created_at DESC',
      [user_id, status]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al filtrar tareas por estado' });
  }
};

// Cambiar estado
export const updateStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const result = await pool.query(
      'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    res.json({ message: 'Estado actualizado', task: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar estado' });
  }
};

// Eliminar tarea
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar tarea' });
  }
};
