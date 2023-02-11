import {describe, expect, test} from "vitest";
import {handler as publicationDUnArbre} from "./publicationDUnArbre";
import {event} from "../../../../commun/infrastructure/primaire/event";
import fs from "fs";

describe('publicationDUnArbre', () => {

    test(`ne doit pas publier un arbre à partir d'un mauvais fichier GEDCOM`, async () => {
        const result = await publicationDUnArbre(event(''));
        expect(result.statusCode).toEqual(400)
        expect(result.body).toEqual(`Le fichier fourni n'est pas au format GEDCOM`);
    })

    test('doit publier un arbre', async () => {
        const fichierGedcomEnBase64 = Buffer.from(fs.readFileSync(__dirname + '/../../../../commun/infrastructure/fixtures/windsor.ged')).toString('base64');

        const result = await publicationDUnArbre(event(fichierGedcomEnBase64));

        expect(result.statusCode).toEqual(200)
        expect(JSON.parse(result.body)).toEqual({
            individus: [
                {
                    id: 'I0000',
                    nom: 'Elisabeth Alexandra Mary WINDSOR'
                },
                {
                    id: 'I0001',
                    nom: 'George VI WINDSOR',
                },
                {
                    id: 'I0002',
                    nom: 'Elisabeth BOWES-LYON',
                }
            ]
        });
    })
})
