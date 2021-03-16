const utilisateurConnecte = require('../authentification/utilisateurConnecte');
const {ok, unauthorized, created, badRequest, noContent} = require("aws-lambda-utils");
const uuid = require('uuid');
const DynamoDBBuilder = require('aws-sdk-fluent-builder').DynamoDbBuilder;
const dynamoDBRepository = new DynamoDBBuilder()
    .withTableName(process.env.TABLE_DONNEES)
    .withPartitionKeyName("partitionKey")
    .build();

module.exports.recupererLesCorrections = async event => {
    const utilisateur = utilisateurConnecte(event);
    if (event.pathParameters.identifiant !== utilisateur.email) {
        return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
    }
    const correctionsDeLUtilisateur = await dynamoDBRepository.findOneByPartitionKey(`${utilisateur.email}#corrections`);
    if (correctionsDeLUtilisateur) {
        return ok(correctionsDeLUtilisateur.corrections);
    }
    return ok([]);
}

module.exports.ajouterUneCorrection = async event => {
    const utilisateur = utilisateurConnecte(event);
    if (event.pathParameters.identifiant !== utilisateur.email) {
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

module.exports.validerUneCorrection = async event => {
    const utilisateur = utilisateurConnecte(event);
    if (event.pathParameters.identifiant !== utilisateur.email) {
        return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
    }
    let correctionsDeLUtilisateur = await dynamoDBRepository.findOneByPartitionKey(`${utilisateur.email}#corrections`);
    if (!correctionsDeLUtilisateur) {
        return badRequest(`La correction n'existe pas`);
    } else {
        correctionsDeLUtilisateur.corrections =
            correctionsDeLUtilisateur.filter(correction => correction.identifiant !== event.pathParameters.identifiantCorrection);
    }
    await dynamoDBRepository.save(correctionsDeLUtilisateur);
    return noContent();
}
