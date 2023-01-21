import {ModelesDArchives} from "../../domaine/ModelesDArchives";
import {ModeleDArchives} from "../../domaine/ModeleDArchives";
import uuid from "uuid";
import {DynamoDbRepository} from "aws-sdk-fluent-builder";
import {IdentifiantDeModeleDArchives} from "../../domaine/IdentifiantDeModeleDArchives";
import {Archive} from "../../../archives/archive.model";

export class ModelesDArchivesDynamoDB implements ModelesDArchives {

    private readonly partitionKey = `archives-modeles`;

    constructor(private dynamoDbRepository: DynamoDbRepository) {
    }

    async ajouter(modeleDArchives: ModeleDArchives): Promise<ModeleDArchives> {
        let archivesModeles = await this.dynamoDbRepository.findOneByPartitionKey(this.partitionKey);
        if (!archivesModeles) {
            archivesModeles = {
                partitionKey: this.partitionKey,
                archives: []
            }
        }
        let archiveCreee: ModeleDArchives = {
            id: uuid.v4(),
            ...modeleDArchives
        };
        archivesModeles.archives.push(archiveCreee);
        await this.dynamoDbRepository.save(archivesModeles);
        return archiveCreee;
    }

    async supprimer(identifiant: IdentifiantDeModeleDArchives): Promise<void> {
        let archivesModeles = await this.dynamoDbRepository.findOneByPartitionKey(this.partitionKey);
        if (archivesModeles && archivesModeles.archives && archivesModeles.archives.length > 0) {
            archivesModeles.archives = archivesModeles.archives.filter((archive: Archive) => archive.id !== identifiant.valeur);
            await this.dynamoDbRepository.save(archivesModeles);
        }
    }
}
