const utilisateurConnecte = require("../authentification/utilisateurConnecte");
const {unauthorized, ok, notFound} = require("aws-lambda-utils");
const DynamoDBBuilder = require('aws-sdk-fluent-builder').DynamoDbBuilder;
const dynamoDBRepository = new DynamoDBBuilder()
    .withTableName(process.env.TABLE_DONNEES)
    .withPartitionKeyName("partitionKey")
    .build();

module.exports.enregistrerApiKey = async event => {
    const utilisateur = utilisateurConnecte(event);
    if (event.pathParameters.identifiant !== utilisateur.email) {
        return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
    }
    try {
        const parametres = JSON.parse(event.body);
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

module.exports.recupererApiKey = async event => {
    const utilisateur = utilisateurConnecte(event);
    if (event.pathParameters.identifiant !== utilisateur.email) {
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