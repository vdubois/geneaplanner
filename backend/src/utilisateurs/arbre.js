const {ok, unauthorized, badRequest, notFound} = require("aws-lambda-utils");
const utilisateurConnecte = require('../authentification/utilisateurConnecte');
const gedcom = require('read-gedcom');
const {rechercherIndividuParIdentifiant} = require('./arbre');
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
    const fichierGEDCOM = Buffer.from(event.body, 'base64');
    const arbre = gedcom.readGedcom(fichierGEDCOM);
    const individus = arbre.getIndividualRecord();
    await espaceDeStockageDesFichiersGEDCOM.writeFile(`${utilisateur.email}.ged`, fichierGEDCOM);
    return ok({
        individus: individus.count()
    });
};

module.exports.rechercher = async event => {
    const utilisateur = utilisateurConnecte(event);
    if (event.pathParameters.identifiant !== utilisateur.email) {
        return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
    }
    try {
        const fichierArbre = await espaceDeStockageDesFichiersGEDCOM.readFile(`${utilisateur.email}.ged`);
        if (fichierArbre) {
            const arbre = gedcom.readGedcom(fichierArbre);
            const individus = arbre.getIndividualRecord();
            const detailIndividus = individus.array().map(individu => ({
                id: individu._data.tree[0].pointer,
                nom: individu.getName().valueAsParts().values[0].join(' ')
            }));
            return ok(detailIndividus);
        }
    } catch (error) {
        return ok([]);
    }
}

module.exports.rechercherParIdentifiant = async event => {
    const utilisateur = utilisateurConnecte(event);
    if (event.pathParameters.identifiant !== utilisateur.email) {
        return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
    }
    try {
        const detailIndividus = await rechercherIndividuParIdentifiant(utilisateur.email, event.pathParameters.identifiantIndividu);
        return ok(detailIndividus);
    } catch (error) {
        return notFound(error.message);
    }
}

module.exports.rechercherIndividuParIdentifiant = async (emailUtilisateur, identifiantIndividu) => {
    console.log('Recherche de ' + identifiantIndividu);
    const fichierArbre = await espaceDeStockageDesFichiersGEDCOM.readFile(`${emailUtilisateur}.ged`);
    if (fichierArbre) {
        const arbre = gedcom.readGedcom(fichierArbre);
        const individus = arbre.getIndividualRecord();
        return individus.array()
          .filter(individu => individu._data.tree[0].pointer === identifiantIndividu)
          .map(individu => ({
              id: individu._data.tree[0].pointer,
              nom: individu.getName().valueAsParts().values[0].join(' ')
          }));
    } else {
        throw new Error(`L'individu d'identifiant ${identifiantIndividu} n'existe pas`);
    }
};
