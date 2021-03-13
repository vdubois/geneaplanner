const ROLE_ADMINISTRATEUR = 'GENEAPLANNER_ADMIN';
const ROLE_UTILISATEUR = 'GENEAPLANNER_USER';

module.exports = (event) => {
    const claims = event.requestContext.authorizer.jwt.claims;
    const roles = claims[`https://geneaplanner/roles`] ? claims[`https://geneaplanner/roles`].split(',') : [];
    const email = claims[`https://geneaplanner/email`];
    const utilisateurVerifieParMail = claims[`https://geneaplanner/email_verified`];
    if (!email) {
        throw new Error(`L'utilisateur n'a pas d'email`);
    }
    if (!utilisateurVerifieParMail) {
        throw new Error(`L'utilisateur ${email} n'a pas été vérifié`);
    }
    if (!roles.includes(ROLE_UTILISATEUR)) {
        throw new Error(`L'utilisateur ${email} n'est pas autorisé à accéder à l'application`);
    }
    return {
        email,
        estAdministrateur: () => roles.includes(role => role === ROLE_ADMINISTRATEUR)
    };
}
