import { HttpHelper } from "../helpers/http-helper.js";
import { Hasher } from "../lib/bcrypt.js";
import { UserRepository } from "../repositories/user-repository.js";
import { Validator } from "../utils/validator.js";

export class UserRegisterController {
    async handle(request, response) {
        const httpHelper = new HttpHelper(response);

        try {
            const { email, password, confirmationPassword } = request.body;

            if (!Validator.fieldsRequired([email, password, confirmationPassword])) {
                return httpHelper.badRequest("Dados são obrigatórios");
            }

            if (!Validator.emailIsValid(email)) {
                return httpHelper.badRequest("E-mail inválido");
            }

            if (!Validator.compareFields(password, confirmationPassword)) {
                return httpHelper.badRequest("As senhas devem ser iguais");
            }

            const userRepository = new UserRepository();

            const userAlreadyExists = await userRepository.findByEmail(email);

            if (userAlreadyExists) {
                return httpHelper.badRequest("Usuário já cadastrado.");
            }

            const hashedPassword = await Hasher.hash(password);

            const userCreated = await userRepository.createUser({
                email,
                password: hashedPassword,
            });

            const accessToken = await response.jwtSign(
                { id: userCreated.id },
                { expiresIn: "1d" },
            );

            return httpHelper.created({ accessToken });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}
