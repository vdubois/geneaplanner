const {ok, unauthorized, badRequest, notFound} = require("aws-lambda-utils");
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
  const fichierGEDCOM = Buffer.from(event.body, 'base64');
  const arbre = gedcom.readGedcom(fichierGEDCOM);
  const individus = arbre.getIndividualRecord();
  await espaceDeStockageDesFichiersGEDCOM.writeFile(`${utilisateur.email}.ged`, fichierGEDCOM);
  return ok({
    individus: individus.length
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
      const detailIndividus = individus.arraySelect().map(individu => ({
        id: individu.pointer().map(s => s !== null ? s.replace(/@/g, '') : undefined)[0],
        nom: individu.getName().valueAsParts().map(s => s !== null ? s.filter(s => !!s).join(' ') : undefined)[0]
      }));
      return ok(detailIndividus);
    }
  } catch (error) {
    return ok([]);
  }
}

const evenementPersonnel = (individu, typeDeLEvenement) => {
  const evenementDeLIndividu = individu.get(typeDeLEvenement).as(gedcom.SelectionIndividualEvent);
  const evenementPresent = evenementDeLIndividu.length > 0;
  if (evenementPresent) {
    const lieuDeLEvenement = evenementDeLIndividu.getPlace().value()[0];
    const dateDeLEvenement = evenementDeLIndividu.getDate().value()[0];
    return {
      date: dateDeLEvenement,
      lieu: lieuDeLEvenement
    }
  }
};

const evenementFamilial = (individu, typeDeLEvenement) => {
  const familleDeLIndividu = individu.getFamilyAsSpouse();
  const evenementDeLIndividu = familleDeLIndividu.get(typeDeLEvenement).as(gedcom.SelectionFamilyEvent);
  const evenementPresent = evenementDeLIndividu.length > 0;
  if (evenementPresent) {
    const lieuDeLEvenement = evenementDeLIndividu.getPlace().value()[0];
    const dateDeLEvenement = evenementDeLIndividu.getDate().value()[0];
    return {
      date: dateDeLEvenement,
      lieu: lieuDeLEvenement
    }
  }
};

const rechercherIndividuParIdentifiant = async (emailUtilisateur, identifiantIndividu) => {
  const fichierArbre = await espaceDeStockageDesFichiersGEDCOM.readFile(`${emailUtilisateur}.ged`);
  if (fichierArbre) {
    const arbre = gedcom.readGedcom(fichierArbre);
    const individu = arbre.getIndividualRecord(identifiantIndividu);
    return {
      id: identifiantIndividu.replace(/@/g, ''),
      nom: individu.getName().valueAsParts().map(s => s !== null ? s.filter(s => !!s).join(' ') : undefined)[0],
      naissance: evenementPersonnel(individu, gedcom.Tag.Birth),
      bapteme: evenementPersonnel(individu, gedcom.Tag.Baptism),
      deces: evenementPersonnel(individu, gedcom.Tag.Death),
      fiancailles: evenementFamilial(individu, gedcom.Tag.Engagement),
      mariage: evenementFamilial(individu, gedcom.Tag.Marriage)
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
