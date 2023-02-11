import { expect, test, describe, afterEach } from 'vitest'
import {handler as recuperationDesInformationsPersonnelles} from "./recuperationDesInformationsPersonnelles";
import {event} from "../../../../commun/infrastructure/primaire/event";
import {inject} from "typescript-inject";
import {DynamoDbRepository} from "aws-sdk-fluent-builder";

describe('recuperationDesInformationsPersonnelles', () => {

    test(`Doit renvoyer les informations personnelles par défaut d'un utilisateur s'il n'existe pas`, async () => {
        const result = await recuperationDesInformationsPersonnelles(event());
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(`{"nom":"","prenom":""}`);
    });

    test(`Doit renvoyer les informations personnelles de l'utilisateur`, async () => {
        const dynamoDBRepository = inject<DynamoDbRepository>('dynamoDBRepository');
        await dynamoDBRepository.save({
            partitionKey: 'vdubois@yopmail.com#compte',
            informationsPersonnelles: {
                nom: 'DUBOIS',
                prenom: 'Vincent'
            }
        });

        const result = await recuperationDesInformationsPersonnelles(event());
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(`{"nom":"DUBOIS","prenom":"Vincent"}`);
    });

    afterEach(async () => {
        const dynamoDBRepository = inject<DynamoDbRepository>('dynamoDBRepository');
        await dynamoDBRepository.deleteByPartitionKey('vdubois@yopmail.com#compte');
    })
});
