import {register} from "typescript-inject";
import {SuppressionDeLArbreDUnCompte} from "../usecases/SuppressionDeLArbreDUnCompte";
import {ArbresAWS} from "./secondaire/ArbresAWS";
import {DynamoDbBuilder, S3Builder} from "aws-sdk-fluent-builder";
import {RecuperationDesInformationsDUnCompte} from "../usecases/RecuperationDesInformationsDUnCompte";
import {ComptesDynamoDB} from "./secondaire/ComptesDynamoDB";
import {AjoutDUnModeleDArchives} from "../usecases/AjoutDUnModeleDArchives";
import {ModelesDArchivesDynamoDB} from "./secondaire/ModelesDArchivesDynamoDB";
import {SuppressionDUnModeleDArchives} from "../usecases/SuppressionDUnModeleDArchives";
import {ModificationDUnModeleDArchives} from "../usecases/ModificationDUnModeleDArchives";
import {SauvegardeDesInformationsDUnCompte} from "../usecases/SauvegardeDesInformationsDUnCompte";
import {PublicationDeLArbreDUnCompte} from "../usecases/PublicationDeLArbreDUnCompte";
import {DefinitionDeLaRacineDeLArbreDUnCompte} from "../usecases/DefinitionDeLaRacineDeLArbreDUnCompte";

const espaceDeStockageDesFichiersGEDCOM = new S3Builder()
    .withBucketName(process.env.BUCKET_FICHIERS_GEDCOM!)
    .asStorageService()
    .build();

const dynamoDBRepository = new DynamoDbBuilder()
    .withTableName(process.env.TABLE_DONNEES!!)
    .withPartitionKeyName("partitionKey")
    .build();

register('SuppressionDeLArbreDUnCompte', () => new SuppressionDeLArbreDUnCompte(new ArbresAWS(espaceDeStockageDesFichiersGEDCOM, dynamoDBRepository)));
register('RecuperationDesInformationsDUnCompte', () => new RecuperationDesInformationsDUnCompte(new ComptesDynamoDB(dynamoDBRepository)));
register('SauvegardeDesInformationsDUnCompte', () => new SauvegardeDesInformationsDUnCompte(new ComptesDynamoDB(dynamoDBRepository)));
register('AjoutDUnModeleDArchives', () => new AjoutDUnModeleDArchives(new ModelesDArchivesDynamoDB(dynamoDBRepository)));
register('ModificationDUnModeleDArchives', () => new ModificationDUnModeleDArchives(new ModelesDArchivesDynamoDB(dynamoDBRepository)));
register('SuppressionDUnModeleDArchives', () => new SuppressionDUnModeleDArchives(new ModelesDArchivesDynamoDB(dynamoDBRepository)));
register('PublicationDeLArbreDUnCompte', () => new PublicationDeLArbreDUnCompte(new ArbresAWS(espaceDeStockageDesFichiersGEDCOM, dynamoDBRepository)));
register('DefinitionDeLaRacineDeLArbreDUnCompte', () => new DefinitionDeLaRacineDeLArbreDUnCompte(new ArbresAWS(espaceDeStockageDesFichiersGEDCOM, dynamoDBRepository)));
