import {APIGatewayProxyEvent} from "aws-lambda";
import {LambdaResult} from "aws-lambda-utils";
import {utilisateurConnecte} from "../authentification/utilisateurConnecte";
import {unauthorized, ok, notFound} from "aws-lambda-utils";
import {DynamoDbBuilder} from 'aws-sdk-fluent-builder';

const dynamoDBRepository = new DynamoDbBuilder()
    .withTableName(process.env.TABLE_DONNEES!!)
    .withPartitionKeyName("partitionKey")
    .build();

export const enregistrerApiKey = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    const utilisateur = utilisateurConnecte(event);
    if (event.pathParameters?.identifiant !== utilisateur.email) {
        return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
    }
    try {
        const parametres = JSON.parse(event.body!!);
        let parametresDeLUtilisateur = await dynamoDBRepository.findOneByPartitionKey(`${utilisateur.email}#parametres`);
        if (!parametresDeLUtilisateur) {
            parametresDeLUtilisateur = {
                partitionKey: `${utilisateur.email}#parametres`,
                googleMapsApiKey: parametres.apiKey
            };
        } else {
            parametresDeLUtilisateur.googleMapsApiKey = parametres.apiKey;
        }
        await dynamoDBRepository.save(parametresDeLUtilisateur);
        return ok(true);
    } catch (erreur) {
        console.error(erreur);
        return ok(false);
    }
}

export const recupererApiKey = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    const utilisateur = utilisateurConnecte(event);
    if (event.pathParameters?.identifiant !== utilisateur.email) {
        return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
    }
    try {
        let parametresDeLUtilisateur = await dynamoDBRepository.findOneByPartitionKey(`${utilisateur.email}#parametres`);
        if (!parametresDeLUtilisateur) {
            return notFound("Clé d'API Google Maps non définie");
        } else {
            return ok({googleMapsApiKey: parametresDeLUtilisateur.googleMapsApiKey});
        }
    } catch (erreur) {
        console.error(erreur);
        return notFound(erreur);
    }
}
