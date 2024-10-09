export class Validator {
    static fieldsRequired(fields) {
        return fields.every(
            (field) => field !== "" && field !== undefined && field !== null,
        );
    }

    static emailIsValid(email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    }

    static compareFields(firstField, secondField) {
        return firstField === secondField;
    }
}
