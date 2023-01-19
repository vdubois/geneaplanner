import {utilisateurConnecte} from "../authentification/utilisateurConnecte";
import {badRequest, created, LambdaResult, noContent, ok, unauthorized} from "aws-lambda-utils";
import uuid from "uuid";
import {rechercherIndividuParIdentifiant} from "../utilisateurs/arbre";
import {DynamoDbBuilder} from "aws-sdk-fluent-builder";
import {APIGatewayProxyEvent} from "aws-lambda";
import {Note} from "./note.model";
import {Recherche} from "./recherche.model";

const dynamoDBRepository = new DynamoDbBuilder()
  .withTableName(process.env.TABLE_DONNEES!)
  .withPartitionKeyName("partitionKey")
  .build();

export const recupererLesRecherches = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
  const utilisateur = utilisateurConnecte(event);
  if (event.pathParameters?.identifiant !== utilisateur.email) {
    return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
  }
  try {
    const partitionKey = `${utilisateur.email}#recherches`;
    const recherchesDeLUtilisateur = await dynamoDBRepository.findOneByPartitionKey(partitionKey);
    if (recherchesDeLUtilisateur) {
      delete recherchesDeLUtilisateur.partitionKey;
      const individus = Object.keys(recherchesDeLUtilisateur.recherches)
      for (let rechercheIndex = 0; rechercheIndex < individus.length; rechercheIndex++) {
        const individu = await rechercherIndividuParIdentifiant(
            utilisateur.email,
            `@${recherchesDeLUtilisateur.recherches[individus[rechercheIndex]].individu}@`);
        recherchesDeLUtilisateur.recherches[individus[rechercheIndex]].nomDeLIndividu = individu.nom;
      }
      return ok(recherchesDeLUtilisateur);
    }
  } catch (error) {
    console.error(error);
  }
  return ok({});
}

export const ajouterDesRecherchesDIndividu = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
  const utilisateur = utilisateurConnecte(event);
  if (event.pathParameters?.identifiant !== utilisateur.email) {
    return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
  }
  if (event.body) {
    const recherche = JSON.parse(event.body);
    const partitionKey = `${utilisateur.email}#recherches`;
    let recherchesDeLUtilisateur = await dynamoDBRepository.findOneByPartitionKey(partitionKey);
    if (!recherchesDeLUtilisateur) {
      recherchesDeLUtilisateur = {
        partitionKey,
        recherches: {}
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

export const supprimerDesRecherchesDIndividu = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
  const utilisateur = utilisateurConnecte(event);
  if (event.pathParameters?.identifiant !== utilisateur.email) {
    return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
  }
  const individu = event.pathParameters?.individu;
  const partitionKey = `${utilisateur.email}#recherches`;
  let recherchesDeLUtilisateur = await dynamoDBRepository.findOneByPartitionKey(partitionKey);
  if (recherchesDeLUtilisateur && recherchesDeLUtilisateur.recherches) {
    delete recherchesDeLUtilisateur.recherches[individu as string];
    await dynamoDBRepository.save(recherchesDeLUtilisateur);
  }
  return noContent();
}

export const ajouterUneNoteAUnIndividu = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
  const utilisateur = utilisateurConnecte(event);
  if (event.pathParameters?.identifiant !== utilisateur.email) {
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
        recherches: {}
      };
    } else {
      const individu = event.pathParameters?.individu as string;
      if (recherchesDeLUtilisateur.recherches[individu]
        && !recherchesDeLUtilisateur.recherches[individu].notes
      ) {
        recherchesDeLUtilisateur.recherches[individu] = {
          ...recherchesDeLUtilisateur.recherches[individu],
          notes: [note]
        };
      } else if (recherchesDeLUtilisateur.recherches[individu].notes) {
        recherchesDeLUtilisateur.recherches[individu].notes.push(note);
      }
    }
    await dynamoDBRepository.save(recherchesDeLUtilisateur);
    return created(note);
  }
  return badRequest('Les informations de la note sont obligatoires');
}

export const ajouterUneRechercheAUnIndividu = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
  const utilisateur = utilisateurConnecte(event);
  if (event.pathParameters?.identifiant !== utilisateur.email) {
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
        recherches: {}
      };
    } else {
      const individu = event.pathParameters?.individu as string;
      if (recherchesDeLIndividu.recherches[individu]
        && !recherchesDeLIndividu.recherches[individu].recherches) {
        recherchesDeLIndividu.recherches[individu] = {
          ...recherchesDeLIndividu.recherches[individu],
          recherches: [recherche]
        };
      } else if (recherchesDeLIndividu.recherches[individu].recherches) {
        recherchesDeLIndividu.recherches[individu].recherches.push(recherche);
      }
    }
    await dynamoDBRepository.save(recherchesDeLIndividu);
    return created(recherche);
  }
  return badRequest('Les informations de la recherche sont obligatoires');
}

export const supprimerUneNoteDUnIndividu = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
  const utilisateur = utilisateurConnecte(event);
  if (event.pathParameters?.identifiant !== utilisateur.email) {
    return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
  }
  let recherchesDeLUtilisateur = await dynamoDBRepository.findOneByPartitionKey(`${utilisateur.email}#recherches`);
  const individu = event.pathParameters?.individu as string;
  if (!recherchesDeLUtilisateur
    || !recherchesDeLUtilisateur.recherches[individu]
    || !recherchesDeLUtilisateur.recherches[individu].notes.find((note: Note) => note.id === event.pathParameters?.note)) {
    return badRequest(`La note n'existe pas`);
  }
  recherchesDeLUtilisateur.recherches[individu].notes =
    recherchesDeLUtilisateur.recherches[individu].notes.filter((note: Note) => note.id !== event.pathParameters?.note);
  await dynamoDBRepository.save(recherchesDeLUtilisateur);
  return noContent();
}

export const supprimerUneRechercheDUnIndividu = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
  const utilisateur = utilisateurConnecte(event);
  if (event.pathParameters?.identifiant !== utilisateur.email) {
    return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
  }
  let recherchesDeLUtilisateur = await dynamoDBRepository.findOneByPartitionKey(`${utilisateur.email}#recherches`);
  const individu = event.pathParameters?.individu as string;
  if (!recherchesDeLUtilisateur
    || !recherchesDeLUtilisateur.recherches[individu]
    || !recherchesDeLUtilisateur.recherches[individu].recherches.find((recherche: Recherche) => recherche.id === event.pathParameters?.recherche)) {
    return badRequest(`La recherche n'existe pas`);
  } else {
    recherchesDeLUtilisateur.recherches[individu].recherches =
      recherchesDeLUtilisateur.recherches[individu].recherches.filter((recherche: Recherche) => recherche.id !== event.pathParameters?.recherche);
  }
  await dynamoDBRepository.save(recherchesDeLUtilisateur);
  return noContent();
}
