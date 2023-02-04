import {register} from "typescript-inject";
import {SuppressionDeLArbreDUnCompte} from "../usecases/SuppressionDeLArbreDUnCompte";
import {ArbresAWS} from "./secondaire/ArbresAWS";
import {DynamoDbBuilder, S3Builder, S3StorageService} from "aws-sdk-fluent-builder";
import {RecuperationDesInformationsPersonnelles} from "../usecases/RecuperationDesInformationsPersonnelles";
import {ComptesDynamoDB} from "./secondaire/ComptesDynamoDB";
import {AjoutDUnModeleDArchives} from "../usecases/AjoutDUnModeleDArchives";
import {ModelesDArchivesDynamoDB} from "./secondaire/ModelesDArchivesDynamoDB";
import {SuppressionDUnModeleDArchives} from "../usecases/SuppressionDUnModeleDArchives";
import {ModificationDUnModeleDArchives} from "../usecases/ModificationDUnModeleDArchives";
import {PublicationDeLArbreDUnCompte} from "../usecases/PublicationDeLArbreDUnCompte";
import {DefinitionDeLaRacineDeLArbreDUnCompte} from "../usecases/DefinitionDeLaRacineDeLArbreDUnCompte";
import {MiseAJourDesInformationsPersonnelles} from "../usecases/MiseAJourDesInformationsPersonnelles";
import {DynamoDbRepositoryInMemory} from "../../commun/infrastructure/secondaire/DynamoDbRepositoryInMemory";
import {S3StorageServiceInMemory} from "../../commun/infrastructure/secondaire/S3StorageServiceInMemory";

if (process.env.PROD) {
    const espaceDeStockageDesFichiersGEDCOM = new S3Builder()
        .withBucketName(process.env.BUCKET_FICHIERS_GEDCOM!)
        .asStorageService()
        .build();

    const dynamoDBRepository = new DynamoDbBuilder()
        .withTableName(process.env.TABLE_DONNEES!!)
        .withPartitionKeyName("partitionKey")
        .build();

    register('SuppressionDeLArbreDUnCompte', () => new SuppressionDeLArbreDUnCompte(new ArbresAWS(espaceDeStockageDesFichiersGEDCOM, dynamoDBRepository)));
    register('RecuperationDesInformationsPersonnelles', () => new RecuperationDesInformationsPersonnelles(new ComptesDynamoDB(dynamoDBRepository)));
    register('AjoutDUnModeleDArchives', () => new AjoutDUnModeleDArchives(new ModelesDArchivesDynamoDB(dynamoDBRepository)));
    register('ModificationDUnModeleDArchives', () => new ModificationDUnModeleDArchives(new ModelesDArchivesDynamoDB(dynamoDBRepository)));
    register('SuppressionDUnModeleDArchives', () => new SuppressionDUnModeleDArchives(new ModelesDArchivesDynamoDB(dynamoDBRepository)));
    register('PublicationDeLArbreDUnCompte', () => new PublicationDeLArbreDUnCompte(new ArbresAWS(espaceDeStockageDesFichiersGEDCOM, dynamoDBRepository)));
    register('DefinitionDeLaRacineDeLArbreDUnCompte', () => new DefinitionDeLaRacineDeLArbreDUnCompte(new ArbresAWS(espaceDeStockageDesFichiersGEDCOM, dynamoDBRepository)));
    register('MiseAJourDesInformationsPersonnelles', () => new MiseAJourDesInformationsPersonnelles(new ComptesDynamoDB(dynamoDBRepository)));
} else {
    const dynamoDBRepository = new DynamoDbRepositoryInMemory();
    const s3StorageService = new S3StorageServiceInMemory() as unknown as S3StorageService;
    register('s3StorageService', () => s3StorageService);
    register('dynamoDBRepository', () => dynamoDBRepository);
//register('SuppressionDeLArbreDUnCompte', () => new SuppressionDeLArbreDUnCompte(new ArbresAWS(espaceDeStockageDesFichiersGEDCOM, dynamoDBRepository)));
    register('RecuperationDesInformationsPersonnelles', () => new RecuperationDesInformationsPersonnelles(new ComptesDynamoDB(dynamoDBRepository)));
//register('AjoutDUnModeleDArchives', () => new AjoutDUnModeleDArchives(new ModelesDArchivesDynamoDB(dynamoDBRepository)));
//register('ModificationDUnModeleDArchives', () => new ModificationDUnModeleDArchives(new ModelesDArchivesDynamoDB(dynamoDBRepository)));
//register('SuppressionDUnModeleDArchives', () => new SuppressionDUnModeleDArchives(new ModelesDArchivesDynamoDB(dynamoDBRepository)));
//register('PublicationDeLArbreDUnCompte', () => new PublicationDeLArbreDUnCompte(new ArbresAWS(espaceDeStockageDesFichiersGEDCOM, dynamoDBRepository)));
//register('DefinitionDeLaRacineDeLArbreDUnCompte', () => new DefinitionDeLaRacineDeLArbreDUnCompte(new ArbresAWS(espaceDeStockageDesFichiersGEDCOM, dynamoDBRepository)));
    register('SuppressionDeLArbreDUnCompte', () => new SuppressionDeLArbreDUnCompte(new ArbresAWS(s3StorageService, dynamoDBRepository)));
    register('MiseAJourDesInformationsPersonnelles', () => new MiseAJourDesInformationsPersonnelles(new ComptesDynamoDB(dynamoDBRepository)));
}
