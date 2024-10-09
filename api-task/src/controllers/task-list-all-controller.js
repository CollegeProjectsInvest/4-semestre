import { HttpHelper } from "../helpers/http-helper.js";
import { TaskRepository } from "../repositories/task-repository.js";

export class TaskListAllController {
    async handle(request, response) {
        const httpHelper = new HttpHelper(response);

        try {
            const { id: userId } = request.user;

            const taskRepository = new TaskRepository();
            const tasks = await taskRepository.getAll({ userId });

            return httpHelper.ok(tasks);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}
