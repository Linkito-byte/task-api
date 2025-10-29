import express from 'express';
import { getAllTasksHandler, createTaskHandler, getTaskByIdHandler } from '../controllers/taskController.js';
import { validateTask } from '../middleware/validateTask.js';

const router = express.Router();

router.get('/', getAllTasksHandler);
router.post('/', validateTask, createTaskHandler);
router.get('/:id', getTaskByIdHandler);

export default router;
