const gedcom = require('read-gedcom');
const fs = require('fs');

const evenementPersonnel = (individu, typeDeLEvenement) => {
    const evenementDeLIndividu = individu[`getEvent${typeDeLEvenement}`].apply(individu);
    const evenementPresent = evenementDeLIndividu._data.tree.length > 0;
    if (evenementPresent) {
        const detailsDeLEvenement = evenementDeLIndividu._data.tree[0].children;
        const lieuDeLEvenement = detailsDeLEvenement.find(element => element.tag === 'PLAC');
        const dateDeLEvenement = detailsDeLEvenement.find(element => element.tag === 'DATE');
        return {
            date: dateDeLEvenement.value,
            lieu: lieuDeLEvenement ? lieuDeLEvenement.value : undefined
        }
    }
};

const evenementFamilial = (individu, typeDeLEvenement) => {
    const evenementDeLIndividu = individu.getFamilyAsSpouse();
    const evenementPresent = evenementDeLIndividu._data.tree.length > 0
        && evenementDeLIndividu._data.tree[0].children.find(element => element.tag === 'MARR') !== undefined;
    if (evenementPresent) {
        const detailsDeLEvenement = evenementDeLIndividu._data.tree[0].children.find(element => element.tag === 'MARR').children;
        const lieuDeLEvenement = detailsDeLEvenement.find(element => element.tag === 'PLAC');
        const dateDeLEvenement = detailsDeLEvenement.find(element => element.tag === 'DATE');
        return {
            date: dateDeLEvenement ? dateDeLEvenement.value : undefined,
            lieu: lieuDeLEvenement ? lieuDeLEvenement.value : undefined
        }
    }
};

const file = fs.readFileSync('/home/v.dubois@eu.lectra.com/Documents/vdubois.ged', 'utf-8');
const tree = gedcom.readGedcom(Buffer.from(file.toString(), 'utf-8'));
const individuals = tree.getIndividualRecord();
console.log(individuals.count());
const firstIndividual = tree.getIndividualRecord('@I0001@');
console.log(firstIndividual.getName().valueAsParts().values[0]);
const searchedIndividuals = individuals
    .filter(individual => individual.getName().valueAsParts().values[0].includes('DUBOIS'));
console.log(searchedIndividuals);
const mappedIndividuals = searchedIndividuals.array().map(individual => ({
    id: individual._data.tree[0].pointer,
    nom: individual.getName().valueAsParts().values[0].join(' '),
    naissance: evenementPersonnel(individual, 'Birth'),
    bapteme: evenementPersonnel(individual, 'Baptism'),
    deces: evenementPersonnel(individual, 'Death'),
    // fiancailles: evenementFamilial(individual, 'Engagement'),
    mariage: evenementFamilial(individual, 'Marriage')
}));
console.log(mappedIndividuals);
