import {APIGatewayProxyEvent} from "aws-lambda";
import {Role} from "./Role";

export class Utilisateur {
    private readonly _email: string;

    private readonly _roles: string[];

    constructor(private event: APIGatewayProxyEvent) {
        const claims = event.requestContext?.authorizer?.jwt.claims;
        this._roles = claims[`https://geneaplanner/roles`] ? claims[`https://geneaplanner/roles`].split(',') : [];
        this._email = claims[`https://geneaplanner/email`];
        const utilisateurVerifieParMail = claims[`https://geneaplanner/email_verified`];
        if (!this._email) {
            throw new Error(`L'utilisateur n'a pas d'email`);
        }
        if (!utilisateurVerifieParMail) {
            throw new Error(`L'utilisateur ${this._email} n'a pas été vérifié`);
        }
        if (!this._roles.includes(Role.UTILISATEUR)) {
            throw new Error(`L'utilisateur ${this._email} n'est pas autorisé à accéder à l'application`);
        }
    }

    get email(): string {
        return this._email;
    }

    estAdministrateur() {
        return this._roles.some((role: string) => role === Role.ADMINISTRATEUR);
    }

    estNonAutorise() {
        return this.event.pathParameters?.identifiant !== this._email;
    }
}
