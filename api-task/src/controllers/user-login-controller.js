import { HttpHelper } from "../helpers/http-helper.js";
import { Hasher } from "../lib/bcrypt.js";
import { UserRepository } from "../repositories/user-repository.js";
import { Validator } from "../utils/validator.js";

export class UserLoginController {
    async handle(request, response) {
        const httpHelper = new HttpHelper(response);

        try {
            const { email, password } = request.body;

            if (!Validator.fieldsRequired([email, password])) {
                return httpHelper.badRequest("Dados são obrigatórios.");
            }

            const userRepository = new UserRepository();

            const userExists = await userRepository.findByEmail(email);

            if (!userExists) {
                return httpHelper.badRequest("Dados inválidos."); // pode especificar que o usuário não existe
            }

            const passwordIsValid = await Hasher.compare(
                password,
                userExists.password,
            );

            if (!passwordIsValid) {
                return httpHelper.badRequest("Dados inválidos."); // pode especificar que a senha está incorreta
            }

            const accessToken = await response.jwtSign(
                { id: userExists.id },
                { expiresIn: "1d" },
            );

            return httpHelper.ok({ accessToken });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}
