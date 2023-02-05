import {Then} from "@badeball/cypress-cucumber-preprocessor";

Then(/^on me demande de saisir mes informations personnelles$/, (login: string, motDePasse: string) => {
    cy.contains(new RegExp(`veuillez tout d'abord renseigner vos informations personnelles`))
})
