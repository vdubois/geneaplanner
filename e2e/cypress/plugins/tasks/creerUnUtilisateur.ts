import {ManagementClient} from "auth0";

interface Compte {
    login: string;
    motDePasse: string;
}

export const creerUnUtilisateur = async ({login, motDePasse}: Compte): Promise<string> => {
    const auth0 = new ManagementClient({
        domain: 'geneaplanner.eu.auth0.com',
        clientId: process.env['AUTH0_API_CLIENT_ID'],
        clientSecret: process.env['AUTH0_API_CLIENT_SECRET'],
        scope: 'create:users',
    });
    try {
        const utilisateur = await auth0.createUser({
            connection: 'Username-Password-Authentication',
            email: login,
            email_verified: true,
            verify_email: false,
            name: login,
            password: motDePasse,
            username: login.split('@')[0]
        });
        return Promise.resolve(utilisateur.user_id!);
    } catch (error: any) {
        return Promise.reject(error);
    }
}
