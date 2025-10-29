import * as taskRepository from '../repositories/taskRepo.js';

export async function getAllTasks() {
  return taskRepository.findAll();
}

export async function createTask(newTask) {
  return taskRepository.create(newTask);
}

export async function getTaskById(id) {
    const task = await findTaskById(id);
    
    if (!task) {
        const error = new Error('Task not found');
        error.status = 404;
        throw error;
    }
    
    return task;
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