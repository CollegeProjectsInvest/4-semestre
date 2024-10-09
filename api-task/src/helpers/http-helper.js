export class HttpHelper {
    constructor(response) {
        this.response = response;
    }

    ok(data) {
        return this.response.status(200).send(data);
    }

    created(data) {
        return this.response.status(201).send(data);
    }

    badRequest(error) {
        return this.response.status(400).send({ error });
    }

    unauthorized() {
        return this.response.status(401).send({ error: "Não autorizado." });
    }

    internalError(error) {
        return this.response
            .status(500)
            .send({ error: `Erro interno do servidor: ${error}` });
    }
}
