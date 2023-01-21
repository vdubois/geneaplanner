import {APIGatewayProxyEvent} from "aws-lambda";
import {Utilisateur} from "./Utilisateur";
import {unauthorized} from "aws-lambda-utils";

// @ts-ignore
export const autoriserAdministrateur = (event: APIGatewayProxyEvent, next: Function) => {
    const utilisateur = new Utilisateur(event);
    if (!utilisateur.estAdministrateur()) {
        return unauthorized(`Vous n'avez pas accès à cette fonctionnalité`);
    }
    return next(event, utilisateur);
}
