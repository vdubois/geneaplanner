import {DataTable} from "@cucumber/cucumber";
import {Given, When} from "@badeball/cypress-cucumber-preprocessor";

export let identifiantsDesUtilisateursCrees: string[] = [];

When(/^j'accède à Généaplanner$/, () => {
    cy.visit('/')
})

When(/^je me connecte avec "(.*)" et "(.*)"$/, (login: string, motDePasse: string) => {
    cy.origin('https://geneaplanner.eu.auth0.com', { args: {login, motDePasse} }, ({login, motDePasse}) => {
        cy.get(`#username`).then(element => element.val(login))
        cy.get('#password').then(element => element.val(motDePasse))
        cy.get("body > div > main > section > div > div > div > form > div > button").click()
    })
})

Given(/^il existe un utilisateur$/, (dataTable: DataTable) => {
    const [login, motDePasse] = dataTable.raw()[1];
    cy.task('creerUnUtilisateur', {
        login,
        motDePasse
    }).then(identifiant => {
        cy.log(identifiant as string);
        console.log(identifiant)
        identifiantsDesUtilisateursCrees.push(identifiant as string);
    });
})

afterEach(() => {
    if (identifiantsDesUtilisateursCrees.length > 0) {
        identifiantsDesUtilisateursCrees.forEach(login => {
            cy.task('supprimerUnUtilisateur', {
                identifiant: login,
            }, {
                timeout: 120000
            }).then(() => cy.log('Utilisateur ' + login + ' supprimé'))
        })
        identifiantsDesUtilisateursCrees = [];
    }
})
