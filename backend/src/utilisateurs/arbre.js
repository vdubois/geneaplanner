const {ok, unauthorized, badRequest, notFound} = require("aws-lambda-utils");
const utilisateurConnecte = require('../authentification/utilisateurConnecte');
const gedcom = require('read-gedcom');
const S3Builder = require('aws-sdk-fluent-builder').S3Builder;
const espaceDeStockageDesFichiersGEDCOM = new S3Builder()
  .withBucketName(process.env.BUCKET_FICHIERS_GEDCOM)
  .asStorageService()
  .build();
const arbre = require('./arbre.fonctions');

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
      const arbreGenealogique = arbre(gedcom.readGedcom(fichierArbre));
      return ok({
        date: arbreGenealogique.date(),
        individus: arbreGenealogique.individus()
      });
    }
  } catch (error) {
    return ok([]);
  }
}

const rechercherIndividuParIdentifiant = async (emailUtilisateur, identifiantIndividu) => {
  const fichierArbre = await espaceDeStockageDesFichiersGEDCOM.readFile(`${emailUtilisateur}.ged`);
  if (fichierArbre) {
    const arbreGenealogique = arbre(gedcom.readGedcom(fichierArbre));
    return {
      id: identifiantIndividu.replace(/@/g, ''),
      nom: arbreGenealogique.nomIndividu(identifiantIndividu),
      naissance: arbreGenealogique.naissance(identifiantIndividu),
      bapteme: arbreGenealogique.bapteme(identifiantIndividu),
      deces: arbreGenealogique.deces(identifiantIndividu),
      fiancailles: arbreGenealogique.fiancailles(identifiantIndividu),
      mariage: arbreGenealogique.mariage(identifiantIndividu)
    };
  } else {
    throw new Error(`L'individu d'identifiant ${identifiantIndividu} n'existe pas`);
  }
};

module.exports.rechercherParIdentifiant = async event => {
  const utilisateur = utilisateurConnecte(event);
  if (event.pathParameters.identifiant !== utilisateur.email) {
    return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
  }
  try {
    const detailIndividus = await rechercherIndividuParIdentifiant(utilisateur.email, `@${event.pathParameters.individu}@`);
    return ok(detailIndividus);
  } catch (error) {
    return notFound(error.message);
  }
}

module.exports.rechercherIndividuParIdentifiant = rechercherIndividuParIdentifiant;
