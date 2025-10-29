import { getAllTasks, createNewTask, getTaskById } from '../services/taskService.js';

export async function getAllTasksHandler(req, res, next) {
  const tasks = await getAllTasks();
  res.status(200).json(tasks);
}

export async function createTaskHandler(req, res, next) {
    try {
        const newTask = await createNewTask(req.body);
        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
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