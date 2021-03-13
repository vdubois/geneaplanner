const {ok, unauthorized} = require("aws-lambda-utils");
const utilisateurConnecte = require('../authentification/utilisateurConnecte');
const gedcom = require('read-gedcom');
const S3Builder = require('aws-sdk-fluent-builder').S3Builder;
const espaceDeStockageDesFichiersGEDCOM = new S3Builder()
    .withBucketName(process.env.BUCKET_FICHIERS_GEDCOM)
    .asStorageService()
    .build();

module.exports.charger = async event => {
    const utilisateur = utilisateurConnecte(event);
    if (event.pathParameters.identifiant !== utilisateur.email) {
        return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
    }
    const arbre = gedcom.readGedcom(Buffer.from(event.body, 'base64'));
    const individus = arbre.getIndividualRecord();
    await espaceDeStockageDesFichiersGEDCOM.writeFile(`${utilisateur.email}.ged`, event.body);
    return ok({
        individus: individus.count()
    });
};
