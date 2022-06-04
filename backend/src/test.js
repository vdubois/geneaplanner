const gedcom = require('read-gedcom');
const fs = require('fs');
const arbre = require('./utilisateurs/arbre.fonctions');


const file = fs.readFileSync('/home/vincent/Téléchargements/vdubois.ged', 'utf-8');
const arbreGenealogique = arbre(gedcom.readGedcom(Buffer.from(file.toString(), 'utf-8')));
console.log(arbreGenealogique.date());
console.log(arbreGenealogique.nombreDIndividus());
console.log(arbreGenealogique.nomIndividu('@I0466@'));
console.log(arbreGenealogique.individus());
console.log(arbreGenealogique.detailsIndividu('@I0466@'));
