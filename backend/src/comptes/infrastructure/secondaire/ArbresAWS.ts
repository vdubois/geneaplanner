import {Arbres} from "../../domaine/Arbres";
import {DynamoDbRepository, S3StorageService} from "aws-sdk-fluent-builder";
import {Individu} from "../../domaine/Individu";
import {Arbre} from "../../../utilisateurs/arbre.fonctions";
import {readGedcom} from "read-gedcom";

export class ArbresAWS implements Arbres {

    constructor(private espaceDeStockageDesFichiersGEDCOM: S3StorageService, private dynamoDbRepository: DynamoDbRepository) {
    }

    async existe(identifiantDuCompte: string): Promise<boolean> {
        const fichierArbre = await this.espaceDeStockageDesFichiersGEDCOM.readFile(`${identifiantDuCompte}.ged`);
        return fichierArbre !== undefined;
    }

    async supprimer(identifiantDuCompte: string): Promise<void> {
        return await this.espaceDeStockageDesFichiersGEDCOM.deleteFile(`${identifiantDuCompte}.ged`);
    }

    async publier(identifiantDuCompte: string, arbre: string): Promise<Array<Individu>> {
        const fichierGEDCOM = Buffer.from(arbre, 'base64');
        const arbreGenealogique = new Arbre(readGedcom(fichierGEDCOM));
        await this.espaceDeStockageDesFichiersGEDCOM.writeFile(`${identifiantDuCompte}.ged`, fichierGEDCOM);
        return arbreGenealogique.individus();
    }

    async definirLaRacine(identifiantDuCompte: string, identifiantDeLaRacineDeLArbre: string): Promise<void> {
        const partitionKey = `${identifiantDuCompte}#racine`;
        let racineDeLArbre = await this.dynamoDbRepository.findOneByPartitionKey(partitionKey);
        if (!racineDeLArbre) {
            racineDeLArbre = {
                partitionKey,
                racine: identifiantDeLaRacineDeLArbre
            };
        } else {
            racineDeLArbre.racine = identifiantDeLaRacineDeLArbre;
        }
        await this.dynamoDbRepository.save(racineDeLArbre);
    }
}
