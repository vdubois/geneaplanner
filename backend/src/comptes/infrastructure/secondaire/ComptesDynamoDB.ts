import {Comptes} from "../../domaine/Comptes";
import {Compte} from "../../domaine/Compte";
import {DynamoDbRepository} from "aws-sdk-fluent-builder";

export class ComptesDynamoDB implements Comptes {

    constructor(private dynamoDbRepository: DynamoDbRepository) {
    }

    async recuperer(identifiantDuCompte: string): Promise<Compte> {
        const modelesDArchives = await this.dynamoDbRepository.findOneByPartitionKey(`archives-modeles`);
        const compte = await this.dynamoDbRepository.findOneByPartitionKey(`${identifiantDuCompte}#parametres`);
        if (compte) {
            return {...compte, modelesDArchives: modelesDArchives.archives ? modelesDArchives.archives : []};
        }
        return {
            googleMapsApiKey: '',
            modelesDArchives: []
        }
    }
}
