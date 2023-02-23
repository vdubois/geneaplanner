export const evenements = [
    {
        identifiant: 'BAPTISM',
        texte: 'Baptême',
    },
    {
        identifiant: 'BIRTH',
        texte: 'Naissance',
    },
    {
        identifiant: 'ENGAGEMENT',
        texte: 'Fiançailles',
    },
    {
        identifiant: 'MARRIAGE',
        texte: 'Mariage',
    },
    {
        identifiant: 'DEATH',
        texte: 'Décès',
    }
];

export const couleurRaison = (identifiantRaison) =>
    raisons.find(raison => raison.identifiant === identifiantRaison).couleur;

export const texteRaison = (identifiantRaison) =>
    raisons.find(raison => raison.identifiant === identifiantRaison).texte;
