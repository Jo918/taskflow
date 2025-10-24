import express from 'express';
import { createTask, getTasks, updateStatus, deleteTask, getTasksByStatus } from '../controllers/taskController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, createTask);
router.get('/', verifyToken, getTasks);
router.put('/status', verifyToken, updateStatus);
router.get('/status/:status', verifyToken, getTasksByStatus);
router.delete('/:id', verifyToken, deleteTask);

export default router;
