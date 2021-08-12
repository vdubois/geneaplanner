export const raisons = [
    {
        identifiant: 'MISSING_DATA',
        texte: 'Donnée manquante',
        couleur: 'indianred'
    },
    {
        identifiant: 'WRONG_ANCESTRY',
        texte: 'Ascendance fausse',
        couleur: 'cornflowerblue'
    },
    {
        identifiant: 'WRONG_DESCENT',
        texte: 'Descendance fausse',
        couleur: 'seagreen'
    },
    {
        identifiant: 'WRONG_DATA',
        texte: 'Donnée fausse',
        couleur: 'firebrick'
    }
];

export const couleurRaison = (identifiantRaison) =>
    raisons.find(raison => raison.identifiant === identifiantRaison).couleur;

export const texteRaison = (identifiantRaison) =>
    raisons.find(raison => raison.identifiant === identifiantRaison).texte;
