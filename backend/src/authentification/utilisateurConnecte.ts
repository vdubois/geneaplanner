import {APIGatewayProxyEvent} from "aws-lambda";
import {Role} from "./role.model";

export const utilisateurConnecte = (event: APIGatewayProxyEvent) => {
    const claims = event.requestContext?.authorizer?.jwt.claims;
    const roles = claims[`https://geneaplanner/roles`] ? claims[`https://geneaplanner/roles`].split(',') : [];
    const email = claims[`https://geneaplanner/email`];
    const utilisateurVerifieParMail = claims[`https://geneaplanner/email_verified`];
    if (!email) {
        throw new Error(`L'utilisateur n'a pas d'email`);
    }
    if (!utilisateurVerifieParMail) {
        throw new Error(`L'utilisateur ${email} n'a pas été vérifié`);
    }
    if (!roles.includes(Role.UTILISATEUR)) {
        throw new Error(`L'utilisateur ${email} n'est pas autorisé à accéder à l'application`);
    }
    return {
        email,
        estAdministrateur: () => roles.some((role: Role) => role === Role.ADMINISTRATEUR)
    };
}
