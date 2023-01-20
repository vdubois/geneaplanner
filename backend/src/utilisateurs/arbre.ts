import {badRequest, created, LambdaResult, noContent, notFound, ok, unauthorized} from "aws-lambda-utils";
import {Utilisateur} from "../commun/infrastructure/primaire/Utilisateur";
import {readGedcom} from "read-gedcom";
import {DynamoDbBuilder, S3Builder} from "aws-sdk-fluent-builder";
import {Arbre} from './arbre.fonctions';
import {APIGatewayProxyEvent} from "aws-lambda";
import {inject} from "typescript-inject";
import {SuppressionDeLArbreDUnCompte, SupprimerLArbreDUnCompte} from "../comptes/usecases/SuppressionDeLArbreDUnCompte";
import '../comptes/infrastructure/configuration';

const espaceDeStockageDesFichiersGEDCOM = new S3Builder()
  .withBucketName(process.env.BUCKET_FICHIERS_GEDCOM!)
  .asStorageService()
  .build();

const dynamoDBRepository = new DynamoDbBuilder()
    .withTableName(process.env.TABLE_DONNEES!)
    .withPartitionKeyName("partitionKey")
    .build();

export const definirRacineDeLArbre = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
  const utilisateur = new Utilisateur(event);
  if (utilisateur.estNonAutorise()) {
    return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
  }
  if (event.body) {
    const racine = JSON.parse(event.body);
    const partitionKey = `${utilisateur.email}#racine`;
    let racineDeLArbre = await dynamoDBRepository.findOneByPartitionKey(partitionKey);
    if (!racineDeLArbre) {
      racineDeLArbre = {
        partitionKey,
        racine: racine.id
      };
    } else {
      racineDeLArbre.racine = racine.id;
    }
    await dynamoDBRepository.save(racineDeLArbre);
    return created(racine);
  }
  return badRequest('Les informations de la racine sont obligatoires');
}

export const charger = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
  const utilisateur = new Utilisateur(event);
  if (utilisateur.estNonAutorise()) {
    return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
  }
  const fichierGEDCOM = Buffer.from(event.body as string, 'base64');
  const arbreGenealogique = new Arbre(readGedcom(fichierGEDCOM));
  await espaceDeStockageDesFichiersGEDCOM.writeFile(`${utilisateur.email}.ged`, fichierGEDCOM);
  return ok({
    individus: arbreGenealogique.individus()
  });
};

export const rechercher = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
  const utilisateur = new Utilisateur(event);
  if (utilisateur.estNonAutorise()) {
    return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
  }
  try {
    const fichierArbre = await espaceDeStockageDesFichiersGEDCOM.readFile(`${utilisateur.email}.ged`);
    if (fichierArbre) {
      const arbreGenealogique = new Arbre(readGedcom(fichierArbre));
      const partitionKey = `${utilisateur.email}#racine`;
      let racineDeLArbre = await dynamoDBRepository.findOneByPartitionKey(partitionKey);
      return ok({
        racine: racineDeLArbre?.racine || '',
        nomRacine: racineDeLArbre?.racine ? arbreGenealogique.nomIndividu(`@${racineDeLArbre?.racine}@`) : '',
        date: arbreGenealogique.date(),
        individus: arbreGenealogique.individus()
      });
    }
    return notFound('Arbre non trouvé');
  } catch (error) {
    console.error(error);
    return ok({
      racine: '',
      individus: []
    });
  }
}

export const detail = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
  const utilisateur = new Utilisateur(event);
  if (utilisateur.estNonAutorise()) {
    return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
  }
  try {
    const fichierArbre = await espaceDeStockageDesFichiersGEDCOM.readFile(`${utilisateur.email}.ged`);
    if (fichierArbre) {
      const arbreGenealogique = new Arbre(readGedcom(fichierArbre));
      return ok(arbreGenealogique.arbre(event.pathParameters?.individu!));
    }
    return notFound('Arbre non trouvé');
  } catch (error) {
    console.error(error);
    return ok([]);
  }
}

export const rechercherIndividuParIdentifiant = async (emailUtilisateur: string, identifiantIndividu: string) => {
  const fichierArbre = await espaceDeStockageDesFichiersGEDCOM.readFile(`${emailUtilisateur}.ged`);
  if (fichierArbre) {
    const arbreGenealogique = new Arbre(readGedcom(fichierArbre));
    return arbreGenealogique.detailsIndividu(identifiantIndividu);
  } else {
    throw new Error(`L'individu d'identifiant ${identifiantIndividu} n'existe pas`);
  }
};

export const rechercherParIdentifiant = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
  const utilisateur = new Utilisateur(event);
  if (utilisateur.estNonAutorise()) {
    return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
  }
  try {
    const detailIndividus = await rechercherIndividuParIdentifiant(utilisateur.email, `@${event.pathParameters?.individu}@`);
    return ok(detailIndividus);
  } catch (error) {
    console.error(error);
    return notFound(error.message);
  }
}

export const supprimer = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
  const utilisateur = new Utilisateur(event);
  if (utilisateur.estNonAutorise()) {
    return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
  }
  const suppressionDUnArbre = inject<SuppressionDeLArbreDUnCompte>('SuppressionDeLArbreDUnCompte');
  const resultat = await suppressionDUnArbre.executer(new SupprimerLArbreDUnCompte(utilisateur.email));
  if (resultat.isFailure()) {
    return notFound('Arbre non existant');
  }
  return noContent();
}