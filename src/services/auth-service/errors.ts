import { ApplicationError } from "../../protocols";

export function invalidCredentialError(): ApplicationError{
    return {
        name: 'InvalidCredentialsError',
        message: 'email or password are incorrect'
    }
}