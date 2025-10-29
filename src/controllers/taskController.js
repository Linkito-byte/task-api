import * as taskService from '../services/taskService.js';
import { getTaskById } from '../services/taskService.js';

export async function getTasks(req, res, next) {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
}

export async function createTask(req, res, next) {
  const { title, completed } = req.body;
  const task = await taskService.createTask({ title, completed });
  res.status(201).json(task);
}

export async function getTaskByIdHandler(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            const error = new Error('Validation failed');
            error.status = 400;
            error.details = ['ID must be a number'];
            throw error;
        }

        const task = await getTaskById(id);
        
        res.status(200).json(task);
    } catch (error) {
        if (error.status === 400 && error.details) {
            return res.status(400).json({ error: error.message, details: error.details });
        }
        if (error.status === 404) {
            return res.status(404).json({ error: error.message });
        }
        
        next(error);
    }
}