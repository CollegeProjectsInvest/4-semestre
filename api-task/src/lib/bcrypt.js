import bcrypt from "bcrypt";

export class Hasher {
    static async hash(text) {
        const hashedText = await bcrypt.hash(text, Number(process.env.SALT));
        return hashedText;
    }

    static async compare(text, hashedText) {
        const isValid = await bcrypt.compare(text, hashedText);
        return isValid;
    }
}
