import {APIGatewayProxyEvent} from "aws-lambda";
import {Utilisateur} from "./Utilisateur";
import {unauthorized} from "aws-lambda-utils";

// @ts-ignore
export const autoriserUtilisateur = (event: APIGatewayProxyEvent, next: Function) => {
    const utilisateur = new Utilisateur(event);
    if (utilisateur.estNonAutorise()) {
        return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
    }
    return next(event, utilisateur);
}
