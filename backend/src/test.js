const gedcom = require('read-gedcom');
const fs = require('fs');
const arbre = require('./utilisateurs/arbre.fonctions');


const file = fs.readFileSync('/home/vincent/Téléchargements/Untitled_1.ged', 'utf-8');
const arbreGenealogique = arbre(gedcom.readGedcom(Buffer.from(file.toString(), 'utf-8')));
console.debug(JSON.stringify(arbreGenealogique.detailsIndividu('@P22@'), null, 4));
/*console.log(arbreGenealogique.date());
console.log(arbreGenealogique.nombreDIndividus());
console.log(arbreGenealogique.nomIndividu('@I0466@'));
console.log(arbreGenealogique.individus());
console.log(arbreGenealogique.detailsIndividu('@I0466@'));*/
