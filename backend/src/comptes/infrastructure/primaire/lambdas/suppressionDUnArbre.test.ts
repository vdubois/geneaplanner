import {handler as suppressionDUnArbre} from "./suppressionDUnArbre";
import {event} from "../../../../commun/infrastructure/primaire/event";
import {inject} from "typescript-inject";
import {S3StorageService} from "aws-sdk-fluent-builder";

describe('suppressionDUnArbre', () => {

    test(`Ne doit pas pouvoir supprimer l'arbre d'un utilisateur s'il n'existe pas`, async () => {
        const result = await suppressionDUnArbre(event());
        expect(result.statusCode).toEqual(404);
        expect(result.body).toEqual('Arbre non existant');
    });

    test(`Doit supprimer l'arbre de l'utilisateur`, async () => {
        const s3StorageService = inject<S3StorageService>('s3StorageService');
        await s3StorageService.writeFile('vdubois@yopmail.com.ged', Buffer.from(''));

        const result = await suppressionDUnArbre(event());
        expect(result.statusCode).toEqual(204);
    });

    afterEach(async () => {
        const s3StorageService = inject<S3StorageService>('s3StorageService');
        await s3StorageService.deleteFile('vdubois@yopmail.com.ged');
    })
});
