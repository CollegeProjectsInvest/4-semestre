import { prisma } from "../lib/prisma.js";

export class TaskRepository {
    async createTask({ title, userId }) {
        const taskCreated = await prisma.task.create({
            data: { title, userId },
        });

        return taskCreated;
    }

    async getAll({ userId }) {
        const tasks = await prisma.task.findMany({
            where: { userId },
            orderBy: { createdAt: "asc" },
        });

        return tasks;
    }

    async get({ id, userId }) {
        const task = await prisma.task.findUnique({ where: { id, userId } });

        return task;
    }

    async update({ id, userId, finished }) {
        const taskUpdated = await prisma.task.update({
            where: { id, userId },
            data: { finished },
        });

        return taskUpdated;
    }

    async delete({ id, userId }) {
        const taskDeleted = await prisma.task.delete({
            where: { id, userId },
        });

        return taskDeleted;
    }
}
