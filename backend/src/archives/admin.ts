import {ok, unauthorized, created, badRequest, noContent, LambdaResult} from "aws-lambda-utils";
import {utilisateurConnecte} from "../authentification/utilisateurConnecte";
import uuid from 'uuid';
import {DynamoDbBuilder} from 'aws-sdk-fluent-builder';
import {APIGatewayProxyEvent} from "aws-lambda";
import {Archive} from "./archive.model";

const dynamoDBRepository = new DynamoDbBuilder()
    .withTableName(process.env.TABLE_DONNEES!)
    .withPartitionKeyName("partitionKey")
    .build();

export const recupererLesArchives = async (): Promise<LambdaResult> => {
    const partitionKey = `archives-modeles`;
    const archivesModeles = await dynamoDBRepository.findOneByPartitionKey(partitionKey);
    if (archivesModeles) {
        delete archivesModeles.partitionKey;
        if (!archivesModeles.archives) {
            archivesModeles.archives = [];
        }
        return ok(archivesModeles.archives);
    }
    return ok([]);
}

export const ajouterUneArchive = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    const utilisateur = utilisateurConnecte(event);
    if (!utilisateur.estAdministrateur()) {
        return unauthorized(`Vous n'avez pas accès à cette fonctionnalité`);
    }
    if (event.body) {
        const archive = JSON.parse(event.body);
        const partitionKey = `archives-modeles`;
        let archivesModeles = await dynamoDBRepository.findOneByPartitionKey(partitionKey);
        if (!archivesModeles) {
            archivesModeles = {
                partitionKey,
                archives: []
            }
        }
        let archiveCreee = {
            id: uuid.v4(),
            ...archive
        };
        archivesModeles.archives.push(archiveCreee);
        await dynamoDBRepository.save(archivesModeles);
        return created(archiveCreee);
    }
    return badRequest(`Les paramètres d'une archive sont obligatoires`);
}

export const modifierUneArchive = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    const utilisateur = utilisateurConnecte(event);
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

export const supprimerUneArchive = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    const utilisateur = utilisateurConnecte(event);
    if (!utilisateur.estAdministrateur()) {
        return unauthorized(`Vous n'avez pas accès à cette fonctionnalité`);
    }
    const archiveId = event.pathParameters?.identifiantArchive;
    const partitionKey = `archives-modeles`;
    let archivesModeles = await dynamoDBRepository.findOneByPartitionKey(partitionKey);
    if (archivesModeles && archivesModeles.archives && archivesModeles.archives.length > 0) {
        archivesModeles.archives = archivesModeles.archives.filter((archive: Archive) => archive.id !== archiveId);
        await dynamoDBRepository.save(archivesModeles);
    }
    return noContent();
}
