import {APIGatewayProxyEvent} from "aws-lambda";
import {LambdaResult} from "aws-lambda-utils";
import {Utilisateur} from "../commun/infrastructure/primaire/Utilisateur";
import {unauthorized, ok} from "aws-lambda-utils";
import {DynamoDbBuilder} from 'aws-sdk-fluent-builder';

const dynamoDBRepository = new DynamoDbBuilder()
    .withTableName(process.env.TABLE_DONNEES!!)
    .withPartitionKeyName("partitionKey")
    .build();

export const enregistrerApiKey = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    const utilisateur = new Utilisateur(event);
    if (utilisateur.estNonAutorise()) {
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
