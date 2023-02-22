import {Auth0Client} from "@auth0/auth0-spa-js";

export const domain = "geneaplanner.eu.auth0.com";
export const clientId = "cVoGtUWf2frEb37nk32xcABCycMSlgoE";
export const audience = "https://geneaplanner-api-gateway/";

export default new Auth0Client({
    domain,
    clientId,
    //audience
});

interface Auth0User {
    'https://geneaplanner/roles': string;
}

export const isAdmin = (user: Auth0User) => {
    const roles = user["https://geneaplanner/roles"];
    return roles.includes('GENEAPLANNER_ADMIN');
}
