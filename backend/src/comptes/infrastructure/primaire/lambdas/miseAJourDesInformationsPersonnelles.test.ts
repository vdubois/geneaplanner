import {handler as miseAJourDesInformationsPersonnelles} from "./miseAJourDesInformationsPersonnelles";
import {
    event,
    eventAuthorizedFor, eventWithUnauthorizedUser,
    eventWithUnverifiedUser,
    eventWithUserWithoutEmail
} from "../../../../commun/infrastructure/primaire/event";

describe('miseAJourDesInformationsPersonnelles', () => {

    test(`Doit renvoyer une erreur lorsque l'utilisateur n'a pas d'email`, async () => {
        try {
            await miseAJourDesInformationsPersonnelles(eventWithUserWithoutEmail({}));
        } catch (error: any) {
            expect(error.message).toEqual(`L'utilisateur n'a pas d'email`)
        }
    })

    test(`Doit renvoyer une erreur lorsque l'utilisateur n'a pas été vérifié`, async () => {
        try {
            await miseAJourDesInformationsPersonnelles(eventWithUnverifiedUser({}));
        } catch (error: any) {
            expect(error.message).toEqual(`L'utilisateur vdubois@yopmail.com n'a pas été vérifié`)
        }
    })

    test(`Doit renvoyer une erreur lorsque l'utilisateur n'a pas le bon rôle`, async () => {
        try {
            await miseAJourDesInformationsPersonnelles(eventWithUnauthorizedUser({}));
        } catch (error: any) {
            expect(error.message).toEqual(`L'utilisateur vdubois@yopmail.com n'est pas autorisé à accéder à l'application`)
        }
    })

    test(`Doit renvoyer une erreur lorsque l'utilisateur essaie d'accéder à une ressource qui ne lui est pas destinée`, async () => {
        const result = await miseAJourDesInformationsPersonnelles(eventAuthorizedFor({}, 'vdubois@gmail.com'));
        expect(result.statusCode).toEqual(403)
        expect(result.body).toEqual('Non autorisé pour le compte vdubois@yopmail.com')
    })

    test('Doit renvoyer une erreur lorsque les informations personnelles ne sont pas renseignées', async () => {
        const result = await miseAJourDesInformationsPersonnelles(event({}));
        expect(result.statusCode).toEqual(400)
        expect(result.body).toEqual('Les propriétés nom et prenom sont obligatoires')
    })

    test('Doit renvoyer une erreur lorsque les informations personnelles sont vides', async () => {
        const result = await miseAJourDesInformationsPersonnelles(event({
            nom: ' ',
            prenom: ' '
        }));
        expect(result.statusCode).toEqual(400)
        expect(result.body).toEqual('Les propriétés nom et prenom sont obligatoires')
    })

    test('Doit renvoyer un succès lorsque les informations personnelles sont renseignées', async () => {
        const result = await miseAJourDesInformationsPersonnelles(event({
            nom: 'DUBOIS',
            prenom: 'Vincent'
        }));
        expect(result.statusCode).toEqual(200)
        expect(result.body).toEqual("true")
    })
})
