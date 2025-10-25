import express from 'express';
import { createTask, getTasks, updateTaskStatus, deleteTask, getTasksByStatus } from '../controllers/taskController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, createTask);
router.get('/', verifyToken, getTasks);
router.get('/status/:status', verifyToken, getTasksByStatus);
router.put('/:id', verifyToken, updateTaskStatus);
router.delete('/:id', verifyToken, deleteTask);

export default router;
