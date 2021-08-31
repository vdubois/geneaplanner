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
        id: individu._data.tree[0].pointer.replace(/@/g, ''),
        nom: individu.getName().valueAsParts().values[0].join(' ')
      }));
      return ok(detailIndividus);
    }
  } catch (error) {
    return ok([]);
  }
}

const evenementPersonnel = (individu, typeDeLEvenement) => {
  const evenementDeLIndividu = individu[`getEvent${typeDeLEvenement}`].apply(individu);
  const evenementPresent = evenementDeLIndividu._data.tree.length > 0;
  if (evenementPresent) {
    const detailsDeLEvenement = evenementDeLIndividu._data.tree[0].children;
    const lieuDeLEvenement = detailsDeLEvenement.find(element => element.tag === 'PLAC');
    const dateDeLEvenement = detailsDeLEvenement.find(element => element.tag === 'DATE');
    return {
      date: dateDeLEvenement.value,
      lieu: lieuDeLEvenement ? lieuDeLEvenement.value : undefined
    }
  }
};

const evenementFamilial = (individu, typeDeLEvenement) => {
  const evenementDeLIndividu = individu.getFamilyAsSpouse();
  const evenementPresent = evenementDeLIndividu._data.tree.length > 0
    && evenementDeLIndividu._data.tree[0].children.find(element => element.tag === typeDeLEvenement) !== undefined;
  if (evenementPresent) {
    const detailsDeLEvenement = evenementDeLIndividu._data.tree[0].children.find(element => element.tag === typeDeLEvenement).children;
    const lieuDeLEvenement = detailsDeLEvenement.find(element => element.tag === 'PLAC');
    const dateDeLEvenement = detailsDeLEvenement.find(element => element.tag === 'DATE');
    return {
      date: dateDeLEvenement ? dateDeLEvenement.value : undefined,
      lieu: lieuDeLEvenement ? lieuDeLEvenement.value : undefined
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
      nom: individu.getName().valueAsParts().values.join().replace(/,/g, ''),
      naissance: evenementPersonnel(individu, 'Birth'),
      bapteme: evenementPersonnel(individu, 'Baptism'),
      deces: evenementPersonnel(individu, 'Death'),
      fiancailles: evenementFamilial(individu, 'ENGA'),
      mariage: evenementFamilial(individu, 'MARR')
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
