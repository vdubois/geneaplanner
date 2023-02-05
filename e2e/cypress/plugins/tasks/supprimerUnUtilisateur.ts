import {ManagementClient} from "auth0";

export const supprimerUnUtilisateur = async (args: {identifiant: string}): Promise<null> => {
    const auth0 = new ManagementClient({
        domain: 'geneaplanner.eu.auth0.com',
        clientId: process.env['AUTH0_API_CLIENT_ID'],
        clientSecret: process.env['AUTH0_API_CLIENT_SECRET'],
        scope: 'delete:users',
    });
    await auth0.deleteUser({
        id: args.identifiant
    })
    return null
}
