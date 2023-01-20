import {Arbres} from "../../domaine/Arbres";
import {S3StorageService} from "aws-sdk-fluent-builder";

export class ArbresS3 implements Arbres {

    constructor(private espaceDeStockageDesFichiersGEDCOM: S3StorageService) {
    }

    async existe(identifiantDuCompte: string): Promise<boolean> {
        const fichierArbre = await this.espaceDeStockageDesFichiersGEDCOM.readFile(`${identifiantDuCompte}.ged`);
        return fichierArbre !== null;
    }

    async supprimer(identifiantDuCompte: string): Promise<void> {
        return await this.espaceDeStockageDesFichiersGEDCOM.deleteFile(`${identifiantDuCompte}.ged`);
    }
}
