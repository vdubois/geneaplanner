export const priorites = [
  {
    valeur: 'basse',
    libelle: 'Basse'
  },
  {
    valeur: 'moyenne',
    libelle: 'Moyenne'
  },
  {
    valeur: 'haute',
    libelle: 'Haute'
  }
];

export const libellePriorite =
  (valeurPriorite) => priorites.find(priorite => priorite.valeur === valeurPriorite)?.libelle;
