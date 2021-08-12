import {Auth0Client} from "@auth0/auth0-spa-js";

export const domain = "geneaplanner.eu.auth0.com";
export const clientId = "cVoGtUWf2frEb37nk32xcABCycMSlgoE";
export const audience = "https://geneaplanner-api-gateway/";

export default new Auth0Client({
    domain,
    client_id: clientId,
    audience
});
