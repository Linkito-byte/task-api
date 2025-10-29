import prisma from '../config/db.js';

export async function findAllTasks() {
  return prisma.task.findMany();
}

export async function createTask(data) {
  return prisma.task.create({
    data,
  });
}

export async function findTaskById(id) {
  return await prisma.task.findUnique({
      where: { id: id },
      select: { id: true, title: true, completed: true }
  });
}
