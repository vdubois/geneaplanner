const utilisateurConnecte = require('../authentification/utilisateurConnecte');
const {ok, unauthorized} = require("aws-lambda-utils");
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
