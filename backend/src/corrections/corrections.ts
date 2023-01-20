import {Utilisateur} from "../commun/infrastructure/primaire/Utilisateur";
import {badRequest, created, LambdaResult, noContent, ok, unauthorized} from "aws-lambda-utils";
import uuid from "uuid";
import {DynamoDbBuilder} from "aws-sdk-fluent-builder";
import {APIGatewayProxyEvent} from "aws-lambda";
import {Correction} from "./correction.model";

const dynamoDBRepository = new DynamoDbBuilder()
    .withTableName(process.env.TABLE_DONNEES!)
    .withPartitionKeyName("partitionKey")
    .build();

export const recupererLesCorrections = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    const utilisateur = new Utilisateur(event);
    if (utilisateur.estNonAutorise()) {
        return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
    }
    const correctionsDeLUtilisateur = await dynamoDBRepository.findOneByPartitionKey(`${utilisateur.email}#corrections`);
    if (correctionsDeLUtilisateur) {
        return ok(correctionsDeLUtilisateur.corrections);
    }
    return ok([]);
}

export const ajouterUneCorrection = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    const utilisateur = new Utilisateur(event);
    if (utilisateur.estNonAutorise()) {
        return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
    }
    if (event.body) {
        const correction = JSON.parse(event.body);
        correction.identifiant = uuid.v4();
        let correctionsDeLUtilisateur = await dynamoDBRepository.findOneByPartitionKey(`${utilisateur.email}#corrections`);
        if (!correctionsDeLUtilisateur) {
            correctionsDeLUtilisateur = {
                partitionKey: `${utilisateur.email}#corrections`,
                corrections: [correction]
            };
        } else {
            correctionsDeLUtilisateur.corrections.push(correction);
        }
        await dynamoDBRepository.save(correctionsDeLUtilisateur);
        return created(correction);
    }
    return badRequest('Les informations de la correction sont obligatoires');
}

export const validerUneCorrection = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    const utilisateur = new Utilisateur(event);
    if (utilisateur.estNonAutorise()) {
        return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
    }
    let correctionsDeLUtilisateur = await dynamoDBRepository.findOneByPartitionKey(`${utilisateur.email}#corrections`);
    if (!correctionsDeLUtilisateur) {
        return badRequest(`La correction n'existe pas`);
    } else {
        correctionsDeLUtilisateur.corrections =
            correctionsDeLUtilisateur.corrections.filter((correction: Correction) => correction.identifiant !== event.pathParameters?.identifiantCorrection);
    }
    await dynamoDBRepository.save(correctionsDeLUtilisateur);
    return noContent();
}
