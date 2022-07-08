const {ok, unauthorized, created, badRequest, noContent} = require("aws-lambda-utils");
const utilisateurConnecte = require("../authentification/utilisateurConnecte");
const uuid = require('uuid');
const DynamoDBBuilder = require('aws-sdk-fluent-builder').DynamoDbBuilder;
const dynamoDBRepository = new DynamoDBBuilder()
    .withTableName(process.env.TABLE_DONNEES)
    .withPartitionKeyName("partitionKey")
    .build();

module.exports.recupererLesArchives = async event => {
    const utilisateur = utilisateurConnecte(event);
    if (!utilisateur.estAdministrateur()) {
        return unauthorized(`Vous n'avez pas accès à cette fonctionnalité`);
    }
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

module.exports.ajouterUneArchive = async event => {
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

module.exports.modifierUneArchive = async event => {
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
            .findIndex(archive => archive.id === event.pathParameters.identifiantArchive);
        if (indexArchiveAModifier !== -1) {
            archivesModeles.archives[indexArchiveAModifier] = {
                id: event.pathParameters.identifiantArchive,
                ...archive
            };
            await dynamoDBRepository.save(archivesModeles);
            return ok(archive);
        }
    }
    return badRequest("L'archive correspondante n'existe pas");
}

module.exports.supprimerUneArchive = async event => {
    const utilisateur = utilisateurConnecte(event);
    if (!utilisateur.estAdministrateur()) {
        return unauthorized(`Vous n'avez pas accès à cette fonctionnalité`);
    }
    const archiveId = event.pathParameters.identifiantArchive;
    const partitionKey = `archives-modeles`;
    let archivesModeles = await dynamoDBRepository.findOneByPartitionKey(partitionKey);
    if (archivesModeles && archivesModeles.archives && archivesModeles.archives.length > 0) {
        archivesModeles.archives = archivesModeles.archives.filter(archive => archive.id !== archiveId);
        await dynamoDBRepository.save(archivesModeles);
    }
    return noContent();
}