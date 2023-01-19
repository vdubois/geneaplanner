import {utilisateurConnecte} from "../authentification/utilisateurConnecte";
import {badRequest, LambdaResult, ok, serverError, unauthorized} from "aws-lambda-utils";
import {Arbre} from "../utilisateurs/arbre.fonctions";
import {readGedcom} from "read-gedcom";
import {DynamoDbBuilder, S3Builder} from "aws-sdk-fluent-builder";
import {APIGatewayProxyEvent} from "aws-lambda";
import {Fichier, Individu} from "./fichier.model";

const dynamoDBRepository = new DynamoDbBuilder()
    .withTableName(process.env.TABLE_DONNEES!)
    .withPartitionKeyName("partitionKey")
    .build();
const espaceDeStockageDesFichiersGEDCOM = new S3Builder()
    .withBucketName(process.env.BUCKET_FICHIERS_GEDCOM!)
    .asStorageService()
    .build();

export const parametres = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    const utilisateur = utilisateurConnecte(event);
    if (event.pathParameters?.identifiant !== utilisateur.email) {
        return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
    }
    try {
        let parametresDeLUtilisateur = await dynamoDBRepository.findOneByPartitionKey(`${utilisateur.email}#parametres`);
        if (!parametresDeLUtilisateur) {
            return ok({host: '', token: '', project: ''});
        } else {
            return ok(parametresDeLUtilisateur.gitlab);
        }
    } catch (erreur) {
        console.error(erreur);
        return ok({host: '', token: '', project: ''});
    }
}

export const connecter = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    const utilisateur = utilisateurConnecte(event);
    if (event.pathParameters?.identifiant !== utilisateur.email) {
        return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
    }
    try {
        const parametresDeConnexion = JSON.parse(event.body!);
        let parametresDeLUtilisateur = await dynamoDBRepository.findOneByPartitionKey(`${utilisateur.email}#parametres`);
        if (!parametresDeLUtilisateur) {
            parametresDeLUtilisateur = {
                partitionKey: `${utilisateur.email}#parametres`,
                gitlab: parametresDeConnexion
            };
        } else {
            parametresDeLUtilisateur.gitlab = parametresDeConnexion;
        }
        await dynamoDBRepository.save(parametresDeLUtilisateur);
        return ok(true);
    } catch (erreur) {
        console.error(erreur);
        return ok(false);
    }
}

export const enregistrerProjet = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    const utilisateur = utilisateurConnecte(event);
    if (event.pathParameters?.identifiant !== utilisateur.email) {
        return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
    }
    try {
        const parametresDeConnexion = JSON.parse(event.body!);
        let parametresDeLUtilisateur = await dynamoDBRepository.findOneByPartitionKey(`${utilisateur.email}#parametres`);
        if (!parametresDeLUtilisateur) {
            parametresDeLUtilisateur = {
                partitionKey: `${utilisateur.email}#parametres`,
                gitlab: {
                    project: parametresDeConnexion.project
                }
            };
        } else {
            parametresDeLUtilisateur.gitlab.project = parametresDeConnexion.project;
        }
        await dynamoDBRepository.save(parametresDeLUtilisateur);
        return ok(true);
    } catch (erreur) {
        console.error(erreur);
        return ok(false);
    }
}

export const enregistrerFichiers = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    const utilisateur = utilisateurConnecte(event);
    if (event.pathParameters?.identifiant !== utilisateur.email) {
        return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
    }
    const fichiers = JSON.parse(event.body!);
    try {
        await dynamoDBRepository.deleteByPartitionKey(`${utilisateur.email}#fichiers-arbre`);
        const fichierArbre = await espaceDeStockageDesFichiersGEDCOM.readFile(`${utilisateur.email}.ged`);
        if (fichierArbre) {
            const arbreGenealogique = new Arbre(readGedcom(fichierArbre));
            const individusDeLArbre = arbreGenealogique.individus();
            const fichiersDeLArbre: Array<Fichier> = [];

            fichiers.forEach((fichier: Fichier) => {
                const individuTrouve = individusDeLArbre.find((individu: Individu) => {
                    const individuRegex = new RegExp(`\\b${individu.id}\\b`);
                    return fichier.path.match(individuRegex) !== null;
                });
                if (individuTrouve) {
                    fichiersDeLArbre.push({
                        ...fichier,
                        individu: individuTrouve.id
                    });
                }
            });

            await dynamoDBRepository.save({
                partitionKey: `${utilisateur.email}#fichiers-arbre`,
                fichiers: fichiersDeLArbre
            })
            return ok(fichiersDeLArbre);
        }
        return badRequest("Vous devez renseigner d'abord votre arbre généalogique");
    } catch (erreur) {
        return serverError(erreur);
    }
}

export const recupererFichiers = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    const utilisateur = utilisateurConnecte(event);
    if (event.pathParameters?.identifiant !== utilisateur.email) {
        return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
    }
    try {
        const fichiers = await dynamoDBRepository.findOneByPartitionKey(`${utilisateur.email}#fichiers-arbre`);
        if (!fichiers) {
            return ok([]);
        }
        return ok(fichiers.fichiers.filter((fichier: Fichier) => fichier.type === 'blob' && fichier.individu === event.pathParameters?.identifiantIndividu));
    } catch (erreur) {
        console.error(erreur);
        return serverError(erreur);
    }
}
