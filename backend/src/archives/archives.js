const utilisateurConnecte = require('../authentification/utilisateurConnecte');
const {ok, unauthorized, created, badRequest, noContent, notFound} = require("aws-lambda-utils");
const uuid = require('uuid');
const DynamoDBBuilder = require('aws-sdk-fluent-builder').DynamoDbBuilder;
const dynamoDBRepository = new DynamoDBBuilder()
  .withTableName(process.env.TABLE_DONNEES)
  .withPartitionKeyName("partitionKey")
  .build();

module.exports.recupererLesArchives = async event => {
  const utilisateur = utilisateurConnecte(event);
  if (event.pathParameters.identifiant !== utilisateur.email) {
    return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
  }
  const partitionKey = `${utilisateur.email}#archives`;
  const archivesDeLUtilisateur = await dynamoDBRepository.findOneByPartitionKey(partitionKey);
  if (archivesDeLUtilisateur) {
    delete archivesDeLUtilisateur.partitionKey;
    if (!archivesDeLUtilisateur.archives) {
      archivesDeLUtilisateur.archives = [];
    }
    return ok(archivesDeLUtilisateur.archives);
  }
  return ok([]);
}

module.exports.ajouterUneArchive = async event => {
  const utilisateur = utilisateurConnecte(event);
  if (event.pathParameters.identifiant !== utilisateur.email) {
    return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
  }
  if (event.body) {
    const archive = JSON.parse(event.body);
    const partitionKey = `${utilisateur.email}#archives`;
    let archivesDeLUtilisateur = await dynamoDBRepository.findOneByPartitionKey(partitionKey);
    if (!archivesDeLUtilisateur) {
      archivesDeLUtilisateur = {
        partitionKey,
        archives: []
      }
    }
    let archiveCreee = {
      id: uuid.v4(),
      ...archive,
      registres: []
    };
    archivesDeLUtilisateur.archives.push(archiveCreee);
    await dynamoDBRepository.save(archivesDeLUtilisateur);
    return created(archiveCreee);
  }
  return badRequest('Le libelle des archives est obligatoire');
}

module.exports.modifierLeLibelleDUneArchive = async event => {
  const utilisateur = utilisateurConnecte(event);
  if (event.pathParameters.identifiant !== utilisateur.email) {
    return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
  }
  if (event.body) {
    const archive = JSON.parse(event.body);
    const partitionKey = `${utilisateur.email}#archives`;
    let archivesDeLUtilisateur = await dynamoDBRepository.findOneByPartitionKey(partitionKey);
    if (!archivesDeLUtilisateur || !archivesDeLUtilisateur.archives) {
      return badRequest('Aucune archive pour cet utilisateur');
    }
    if (archive.libelle) {
      return badRequest("Le libellé de l'archive est obligatoire");
    }
    let archiveAModifier = archivesDeLUtilisateur.archives
      .find(archive => archive.id === event.pathParameters.identifiantArchive);
    if (archiveAModifier) {
      archiveAModifier.libelle = archive.libelle;
      await dynamoDBRepository.save(archivesDeLUtilisateur);
      return ok(archiveAModifier);
    }
  }
  return badRequest("L'archive correspondante n'existe pas");
}

module.exports.supprimerUneArchive = async event => {
  const utilisateur = utilisateurConnecte(event);
  if (event.pathParameters.identifiant !== utilisateur.email) {
    return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
  }
  const archiveId = event.pathParameters.identifiantArchive;
  const partitionKey = `${utilisateur.email}#archives`;
  let archivesDeLUtilisateur = await dynamoDBRepository.findOneByPartitionKey(partitionKey);
  if (archivesDeLUtilisateur && archivesDeLUtilisateur.archives && archivesDeLUtilisateur.archives.length > 0) {
    archivesDeLUtilisateur.archives = archivesDeLUtilisateur.archives.filter(archive => archive.id !== archiveId);
    await dynamoDBRepository.save(archivesDeLUtilisateur);
  }
  return noContent();
}

module.exports.recupererUneArchive = async event => {
  const utilisateur = utilisateurConnecte(event);
  if (event.pathParameters.identifiant !== utilisateur.email) {
    return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
  }
  const partitionKey = `${utilisateur.email}#archives`;
  const archivesDeLUtilisateur = await dynamoDBRepository.findOneByPartitionKey(partitionKey);
  if (archivesDeLUtilisateur && archivesDeLUtilisateur.archives) {
    const archiveId = event.pathParameters.identifiantArchive;
    return ok(archivesDeLUtilisateur.archives.find(archive => archive.id === archiveId));
  }
  return notFound('Archive non existante');
}

module.exports.ajouterRegistreAuxArchives = async event => {
  const utilisateur = utilisateurConnecte(event);
  if (event.pathParameters.identifiant !== utilisateur.email) {
    return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
  }
  if (event.body) {
    const registre = JSON.parse(event.body);
    const partitionKey = `${utilisateur.email}#archives`;
    let archivesDeLUtilisateur = await dynamoDBRepository.findOneByPartitionKey(partitionKey);
    const archiveId = event.pathParameters.identifiantArchive;
    if (!archivesDeLUtilisateur || !archivesDeLUtilisateur.archives.find(archive => archive.id === archiveId)) {
      return badRequest(`Les archives demandées n'existent pas`);
    }
    let registreCree = {
      id: uuid.v4(),
      ...registre,
    };
    archivesDeLUtilisateur.archives.find(archive => archive.id === archiveId).registres.push(registre);
    await dynamoDBRepository.save(archivesDeLUtilisateur);
    return created(registreCree);
  }
  return badRequest('Les paramètres du registre sont obligatoires');
}
