const utilisateurConnecte = require("../authentification/utilisateurConnecte");
const {unauthorized, ok, serverError, badRequest} = require("aws-lambda-utils");
const arbre = require("../utilisateurs/arbre.fonctions");
const gedcom = require("read-gedcom");
const DynamoDBBuilder = require('aws-sdk-fluent-builder').DynamoDbBuilder;
const dynamoDBRepository = new DynamoDBBuilder()
    .withTableName(process.env.TABLE_DONNEES)
    .withPartitionKeyName("partitionKey")
    .build();
const S3Builder = require('aws-sdk-fluent-builder').S3Builder;
const espaceDeStockageDesFichiersGEDCOM = new S3Builder()
    .withBucketName(process.env.BUCKET_FICHIERS_GEDCOM)
    .asStorageService()
    .build();

module.exports.parametres = async event => {
    const utilisateur = utilisateurConnecte(event);
    if (event.pathParameters.identifiant !== utilisateur.email) {
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

module.exports.connecter = async event => {
    const utilisateur = utilisateurConnecte(event);
    if (event.pathParameters.identifiant !== utilisateur.email) {
        return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
    }
    try {
        const parametresDeConnexion = JSON.parse(event.body);
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

module.exports.enregistrerProjet = async event => {
    const utilisateur = utilisateurConnecte(event);
    if (event.pathParameters.identifiant !== utilisateur.email) {
        return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
    }
    try {
        const parametresDeConnexion = JSON.parse(event.body);
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

module.exports.enregistrerFichiers = async event => {
    const utilisateur = utilisateurConnecte(event);
    if (event.pathParameters.identifiant !== utilisateur.email) {
        return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
    }
    const fichiers = JSON.parse(event.body);
    try {
        await dynamoDBRepository.deleteByPartitionKey(`${utilisateur.email}#fichiers-arbre`);
        const fichierArbre = await espaceDeStockageDesFichiersGEDCOM.readFile(`${utilisateur.email}.ged`);
        if (fichierArbre) {
            const arbreGenealogique = arbre(gedcom.readGedcom(fichierArbre));
            const individusDeLArbre = arbreGenealogique.individus();
            const fichiersDeLArbre = [];

            fichiers.forEach(fichier => {
                const individuTrouve = individusDeLArbre.find(individu =>
                    fichier.path.includes(individu.id)
                    && fichier.path.toLowerCase().includes(individu.nom.toLowerCase()));
                if (individuTrouve) {
                    fichiersDeLArbre.push({
                        individu: individuTrouve.id,
                        ...fichier
                    });
                }
            });

            await dynamoDBRepository.save({
                partitionKey: `${utilisateur.email}#fichiers-arbre`,
                fichiers: fichiersDeLArbre
            })
            return fichiersDeLArbre;
        }
        return badRequest("Vous devez renseigner d'abord votre arbre généalogique");
    } catch (erreur) {
        return serverError(erreur);
    }
}