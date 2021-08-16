const utilisateurConnecte = require('../authentification/utilisateurConnecte');
const {ok, unauthorized, created, badRequest, noContent} = require("aws-lambda-utils");
const uuid = require('uuid');
const {rechercherIndividuParIdentifiant} = require('../utilisateurs/arbre');
const DynamoDBBuilder = require('aws-sdk-fluent-builder').DynamoDbBuilder;
const dynamoDBRepository = new DynamoDBBuilder()
  .withTableName(process.env.TABLE_DONNEES)
  .withPartitionKeyName("partitionKey")
  .build();

module.exports.recupererLesRecherches = async event => {
  const utilisateur = utilisateurConnecte(event);
  if (event.pathParameters.identifiant !== utilisateur.email) {
    return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
  }
  const partitionKey = `${utilisateur.email}#recherches`;
  const recherchesDeLUtilisateur = await dynamoDBRepository.findOneByPartitionKey(partitionKey);
  if (recherchesDeLUtilisateur) {
    delete recherchesDeLUtilisateur.partitionKey;
    const individus = Object.keys(recherchesDeLUtilisateur.recherches)
    for (let rechercheIndex = 0; rechercheIndex < individus.length; rechercheIndex++) {
      const individu = await rechercherIndividuParIdentifiant(
        utilisateur.email,
        recherchesDeLUtilisateur.recherches[individus[rechercheIndex]].individu);
      recherchesDeLUtilisateur.recherches[individus[rechercheIndex]].nomDeLIndividu = individu.nom;
    }
    return ok(recherchesDeLUtilisateur);
  }
  return ok({});
}

module.exports.ajouterDesRecherchesDIndividu = async event => {
  const utilisateur = utilisateurConnecte(event);
  if (event.pathParameters.identifiant !== utilisateur.email) {
    return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
  }
  if (event.body) {
    const recherche = JSON.parse(event.body);
    const partitionKey = `${utilisateur.email}#recherches`;
    let recherchesDeLUtilisateur = await dynamoDBRepository.findOneByPartitionKey(partitionKey);
    if (!recherchesDeLUtilisateur) {
      recherchesDeLUtilisateur = {
        partitionKey,
        recherches: {
        }
      };
      if (!recherchesDeLUtilisateur.recherches[recherche.individu.id]) {
        recherchesDeLUtilisateur.recherches[recherche.individu.id] = {
          ...recherche,
          individu: recherche.individu.id,
        };
      }
    } else {
      recherchesDeLUtilisateur.recherches[recherche.individu.id] = {
        ...recherche,
        individu: recherche.individu.id,
      };
    }
    await dynamoDBRepository.save(recherchesDeLUtilisateur);
    return created(recherche);
  }
  return badRequest('Les informations de l\'individu sont obligatoires');
}

module.exports.supprimerDesRecherchesDIndividu = async event => {
  const utilisateur = utilisateurConnecte(event);
  if (event.pathParameters.identifiant !== utilisateur.email) {
    return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
  }
  const individu = event.pathParameters.individu;
  const partitionKey = `${utilisateur.email}#recherches`;
  let recherchesDeLUtilisateur = await dynamoDBRepository.findOneByPartitionKey(partitionKey);
  if (recherchesDeLUtilisateur && recherchesDeLUtilisateur.recherches) {
    delete recherchesDeLUtilisateur.recherches[individu];
    await dynamoDBRepository.save(recherchesDeLUtilisateur);
  }
  return noContent();
}

module.exports.ajouterUneNoteAUnIndividu = async event => {
  const utilisateur = utilisateurConnecte(event);
  if (event.pathParameters.identifiant !== utilisateur.email) {
    return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
  }
  if (event.body) {
    const note = JSON.parse(event.body);
    note.id = uuid.v4();
    const partitionKey = `${utilisateur.email}#recherches`;
    let recherchesDeLUtilisateur = await dynamoDBRepository.findOneByPartitionKey(partitionKey);
    if (!recherchesDeLUtilisateur) {
      recherchesDeLUtilisateur = {
        partitionKey,
        recherches: {
        }
      };
      if (!recherchesDeLUtilisateur.recherches[event.pathParameters.individu]) {
        recherchesDeLUtilisateur.recherches[event.pathParameters.individu] = {
          notes: [note]
        };
      }
    } else {
      recherchesDeLUtilisateur.recherches[event.pathParameters.individu].notes.push(note);
    }
    await dynamoDBRepository.save(recherchesDeLUtilisateur);
    return created(note);
  }
  return badRequest('Les informations de la note sont obligatoires');
}

module.exports.ajouterUneRechercheAUnIndividu = async event => {
  const utilisateur = utilisateurConnecte(event);
  if (event.pathParameters.identifiant !== utilisateur.email) {
    return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
  }
  if (event.body) {
    const recherche = JSON.parse(event.body);
    recherche.id = uuid.v4();
    const partitionKey = `${utilisateur.email}#recherches`;
    let recherchesDeLIndividu = await dynamoDBRepository.findOneByPartitionKey(partitionKey);
    if (!recherchesDeLIndividu) {
      recherchesDeLIndividu = {
        partitionKey,
        recherches: {
        }
      };
      if (!recherchesDeLIndividu.recherches[event.pathParameters.individu]) {
        recherchesDeLIndividu.recherches[event.pathParameters.individu] = {
          recherches: [recherche]
        };
      }
    } else {
      recherchesDeLIndividu.recherches[event.pathParameters.individu].recherches.push(recherche);
    }
    await dynamoDBRepository.save(recherchesDeLIndividu);
    return created(recherche);
  }
  return badRequest('Les informations de la note sont obligatoires');
}

module.exports.supprimerUneNoteDUnIndividu = async event => {
  const utilisateur = utilisateurConnecte(event);
  if (event.pathParameters.identifiant !== utilisateur.email) {
    return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
  }
  let recherchesDeLUtilisateur = await dynamoDBRepository.findOneByPartitionKey(`${utilisateur.email}#recherches`);
  if (!recherchesDeLUtilisateur
    || !recherchesDeLUtilisateur.recherches[event.pathParameters.individu]
    || !recherchesDeLUtilisateur.recherches[event.pathParameters.individu].notes.find(note => note.id === event.pathParameters.note)) {
    return badRequest(`La note n'existe pas`);
  }
  recherchesDeLUtilisateur.recherches[event.pathParameters.individu].notes =
    recherchesDeLUtilisateur.recherches[event.pathParameters.individu].notes.filter(note => note.id !== event.pathParameters.note);
  await dynamoDBRepository.save(recherchesDeLUtilisateur);
  return noContent();
}

module.exports.supprimerUneRechercheDUnIndividu = async event => {
  const utilisateur = utilisateurConnecte(event);
  if (event.pathParameters.identifiant !== utilisateur.email) {
    return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
  }
  let recherchesDeLUtilisateur = await dynamoDBRepository.findOneByPartitionKey(`${utilisateur.email}#recherches`);
  if (!recherchesDeLUtilisateur
    || !recherchesDeLUtilisateur.recherches[event.pathParameters.individu]
    || !recherchesDeLUtilisateur.recherches[event.pathParameters.individu].recherches.find(recherche => recherche.id === event.pathParameters.recherche)) {
    return badRequest(`La recherche n'existe pas`);
  } else {
    recherchesDeLUtilisateur.recherches[event.pathParameters.individu].recherches =
      recherchesDeLUtilisateur.recherches[event.pathParameters.individu].recherches.filter(recherche => recherche.id !== event.pathParameters.recherche);
  }
  await dynamoDBRepository.save(recherchesDeLUtilisateur);
  return noContent();
}
