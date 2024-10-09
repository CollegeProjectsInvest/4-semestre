import { HttpHelper } from "../helpers/http-helper.js";
import { TaskRepository } from "../repositories/task-repository.js";
import { Validator } from "../utils/validator.js";

export class TaskUpdateController {
    async handle(request, response) {
        const httpHelper = new HttpHelper(response);

        try {
            const { id: userId } = request.user;
            const { id, finished } = request.body;

            if (!Validator.fieldsRequired([id, finished])) {
                return httpHelper.badRequest("Dados são obrigatórios.");
            }

            const taskRepository = new TaskRepository();

            const taskExists = await taskRepository.get({ id, userId });

            if (!taskExists) {
                return httpHelper.badRequest("Dados inválidos.");
            }

            const taskUpdated = await taskRepository.update({
                id,
                userId,
                finished,
            });

            return httpHelper.ok(taskUpdated);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}
