import {ok, unauthorized, badRequest, LambdaResult} from "aws-lambda-utils";
import {Utilisateur} from "../commun/infrastructure/primaire/Utilisateur";
import {DynamoDbBuilder} from 'aws-sdk-fluent-builder';
import {APIGatewayProxyEvent} from "aws-lambda";
import {Archive} from "./archive.model";

const dynamoDBRepository = new DynamoDbBuilder()
    .withTableName(process.env.TABLE_DONNEES!)
    .withPartitionKeyName("partitionKey")
    .build();

export const modifierUneArchive = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    const utilisateur = new Utilisateur(event);
    if (!utilisateur.estAdministrateur()) {
        return unauthorized(`Vous n'avez pas accès à cette fonctionnalité`);
    }
    if (event.body) {
        const archive = JSON.parse(event.body);
        const partitionKey = `archives-modeles`;
        let archivesModeles = await dynamoDBRepository.findOneByPartitionKey(partitionKey);
        if (!archivesModeles || !archivesModeles.archives) {
            return badRequest('Aucune archive existante');
        }
        let indexArchiveAModifier = archivesModeles.archives
            .findIndex((archive: Archive) => archive.id === event.pathParameters?.identifiantArchive);
        if (indexArchiveAModifier !== -1) {
            archivesModeles.archives[indexArchiveAModifier] = {
                id: event.pathParameters?.identifiantArchive,
                ...archive
            };
            await dynamoDBRepository.save(archivesModeles);
            return ok(archive);
        }
    }
    return badRequest("L'archive correspondante n'existe pas");
}
