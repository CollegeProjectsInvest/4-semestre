import { HttpHelper } from "../helpers/http-helper.js";
import { TaskRepository } from "../repositories/task-repository.js";
import { Validator } from "../utils/validator.js";

export class TaskCreateController {
    async handle(request, response) {
        const httpHelper = new HttpHelper(response);

        try {
            const { id: userId } = request.user;
            const { title } = request.body;

            if (!Validator.fieldsRequired([title])) {
                return httpHelper.badRequest("Dados são obrigatórios.");
            }

            const taskRepository = new TaskRepository();

            const taskCreated = await taskRepository.createTask({
                title,
                userId,
            });

            return httpHelper.created(taskCreated);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}
