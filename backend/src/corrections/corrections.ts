import {Utilisateur} from "../commun/infrastructure/primaire/Utilisateur";
import {badRequest, created, LambdaResult, noContent, ok} from "aws-lambda-utils";
import uuid from "uuid";
import {DynamoDbBuilder} from "aws-sdk-fluent-builder";
import {APIGatewayProxyEvent} from "aws-lambda";
import {Correction} from "./correction.model";
import {autoriserUtilisateur} from "../commun/infrastructure/primaire/autoriserUtilisateur";

const dynamoDBRepository = new DynamoDbBuilder()
    .withTableName(process.env.TABLE_DONNEES!)
    .withPartitionKeyName("partitionKey")
    .build();

export const recupererLesCorrections = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    // @ts-ignore
    return autoriserUtilisateur(event, async (event: APIGatewayProxyEvent, utilisateur: Utilisateur): Promise<LambdaResult> => {
        const correctionsDeLUtilisateur = await dynamoDBRepository.findOneByPartitionKey(`${utilisateur.email}#corrections`);
        if (correctionsDeLUtilisateur) {
            return ok(correctionsDeLUtilisateur.corrections);
        }
        return ok([]);
    });
}

export const ajouterUneCorrection = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    // @ts-ignore
    return autoriserUtilisateur(event, async (event: APIGatewayProxyEvent, utilisateur: Utilisateur): Promise<LambdaResult> => {
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
    });
}

export const validerUneCorrection = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    // @ts-ignore
    return autoriserUtilisateur(event, async (event: APIGatewayProxyEvent, utilisateur: Utilisateur): Promise<LambdaResult> => {
        let correctionsDeLUtilisateur = await dynamoDBRepository.findOneByPartitionKey(`${utilisateur.email}#corrections`);
        if (!correctionsDeLUtilisateur) {
            return badRequest(`La correction n'existe pas`);
        } else {
            correctionsDeLUtilisateur.corrections =
                correctionsDeLUtilisateur.corrections.filter((correction: Correction) => correction.identifiant !== event.pathParameters?.identifiantCorrection);
        }
        await dynamoDBRepository.save(correctionsDeLUtilisateur);
        return noContent();
    });
}
