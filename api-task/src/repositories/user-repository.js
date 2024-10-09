import { prisma } from "../lib/prisma.js";

export class UserRepository {
    async findByEmail(email) {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        return user;
    }

    async createUser({ email, password }) {
        const user = await prisma.user.create({
            data: {
                email,
                password,
            },
        });

        return user;
    }
}
