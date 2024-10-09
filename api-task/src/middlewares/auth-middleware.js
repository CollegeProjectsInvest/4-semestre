import { HttpHelper } from "../helpers/http-helper.js";

export async function authMiddleware(request, response) {
    const httpHelper = new HttpHelper(response);

    try {
        await request.jwtVerify();
    } catch (error) {
        return httpHelper.unauthorized();
    }
}
