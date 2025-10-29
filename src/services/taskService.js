import * as taskRepository from '../repositories/taskRepo.js';
import { findAllTasks, createTask, findTaskById } from '../repositories/taskRepo.js';

export async function getAllTasks() {
  return await findAllTasks();
}

export async function createNewTask(newTask) {
  return await createTask(newTask);
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