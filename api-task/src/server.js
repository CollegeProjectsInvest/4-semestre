import Fastify from "fastify";
import jwt from "@fastify/jwt";

import { UserRegisterController } from "./controllers/user-register-controller.js";
import { UserLoginController } from "./controllers/user-login-controller.js";
import { TaskCreateController } from "./controllers/task-create-controller.js";
import { TaskListAllController } from "./controllers/task-list-all-controller.js";
import { TaskUpdateController } from "./controllers/task-update-controller.js";
import { TaskDeleteController } from "./controllers/task-delete-controller.js";

import { authMiddleware } from "./middlewares/auth-middleware.js";

const fastify = Fastify({ logger: true });

fastify.register(jwt, {
    secret: process.env.SECRET_JWT,
});

// Rotas

// Usuário
fastify.post("/api/user/register", new UserRegisterController().handle);
fastify.post("/api/user/login", new UserLoginController().handle);

// Tarefa
fastify.post(
    "/api/task/create",
    { preHandler: [authMiddleware] },
    new TaskCreateController().handle,
);
fastify.get(
    "/api/task/list-all",
    { preHandler: [authMiddleware] },
    new TaskListAllController().handle,
);
fastify.patch(
    "/api/task/update",
    { preHandler: [authMiddleware] },
    new TaskUpdateController().handle,
);
fastify.delete(
    "/api/task/delete",
    { preHandler: [authMiddleware] },
    new TaskDeleteController().handle,
);

// Start
fastify.listen({ port: 8080 }).then(() => {
    fastify.log.info("Server started!");
});
