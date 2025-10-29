import express from 'express';
import * as taskController from '../controllers/taskController.js';
import { getTaskByIdHandler } from '../controllers/taskController.js';
import { validateTask } from '../middleware/validateTask.js';

const router = express.Router();

router.get('/', taskController.getTasks);
router.post('/', validateTask, taskController.createTask);
router.get('/:id', getTaskByIdHandler);

export default router;
