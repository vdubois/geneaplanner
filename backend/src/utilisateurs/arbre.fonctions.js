module.exports = ((arbreGedcom) => {

    const evenementPersonnel = (individu, typeDeLEvenement) => {
        const evenementDeLIndividu = individu[`getEvent${typeDeLEvenement}`].apply(individu);
        const evenementPresent = evenementDeLIndividu.length > 0;
        if (evenementPresent) {
            const lieu = evenementDeLIndividu.getPlace().valueAsParts().join().replaceAll(',', ', ');
            const date = evenementDeLIndividu.getDate().valueAsDate()[0].date;
            return {
                date,
                lieu
            }
        }
    };

    const nomIndividu = (identifiantIndividu) => {
        const individu = arbreGedcom.getIndividualRecord(identifiantIndividu);
        return individu.getName().getGivenName().value() + ' ' + individu.getName().getSurname().value();
    };

    const sexeIndividu = (identifiantIndividu) => {
        const individu = arbreGedcom.getIndividualRecord(identifiantIndividu);
        return individu.getSex().value()[0];
    };

    const naissance = (identifiantIndividu) => {
        const individu = arbreGedcom.getIndividualRecord(identifiantIndividu);
        return evenementPersonnel(individu, 'Birth');
    };

    const bapteme = (identifiantIndividu) => {
        const individu = arbreGedcom.getIndividualRecord(identifiantIndividu);
        return evenementPersonnel(individu, 'Baptism');
    };

    const deces = (identifiantIndividu) => {
        const individu = arbreGedcom.getIndividualRecord(identifiantIndividu);
        return evenementPersonnel(individu, 'Death');
    };

    const mariage = (identifiantIndividu) => {
        const individu = arbreGedcom.getIndividualRecord(identifiantIndividu);
        const evenementDeLIndividu = individu.getFamilyAsSpouse();
        const evenementPresent = evenementDeLIndividu.length > 0
            && evenementDeLIndividu.getEventMarriage().length > 0;
        const sexe = individu.getSex().value()[0];
        if (evenementPresent) {
            const detailsDeLEvenement = evenementDeLIndividu.getEventMarriage();
            const lieu = detailsDeLEvenement.getPlace().value()[0];
            const date = detailsDeLEvenement.getDate().valueAsDate()[0]?.date;
            return {
                date,
                lieu,
                epouse: sexe === 'M' ? evenementDeLIndividu.getWife().getIndividualRecord().getName().getGivenName().value() + ' ' + evenementDeLIndividu.getWife().getIndividualRecord().getName().getSurname().value()
                    : evenementDeLIndividu.getHusband().getIndividualRecord().getName().getGivenName().value() + ' ' + evenementDeLIndividu.getHusband().getIndividualRecord().getName().getSurname().value()
            }
        }
    };

    const fiancailles = (identifiantIndividu) => {
        const individu = arbreGedcom.getIndividualRecord(identifiantIndividu);
        const evenementDeLIndividu = individu.getFamilyAsSpouse();
        const evenementPresent = evenementDeLIndividu.length > 0
            && evenementDeLIndividu.getEventEngagement().length > 0;
        if (evenementPresent) {
            const detailsDeLEvenement = evenementDeLIndividu.getEventEngagement();
            const lieu = detailsDeLEvenement.getPlace().value()[0];
            const date = detailsDeLEvenement.getDate().valueAsDate()[0].date;
            return {
                date,
                lieu
            }
        }
    };

    const arbre = (identifiantIndividu) => {
        const aUnPere = (individu) => individu.getFamilyAsChild()
            && individu.getFamilyAsChild().getHusband()
            && individu.getFamilyAsChild().getHusband().value()
            && individu.getFamilyAsChild().getHusband().value()[0];
        const aUneMere = (individu) => individu.getFamilyAsChild()
            && individu.getFamilyAsChild().getWife()
            && individu.getFamilyAsChild().getWife().value()
            && individu.getFamilyAsChild().getWife().value()[0];
        const parents = (individu) => {
            const parentsArray = [];
            if (aUnPere(individu)) {
                parentsArray.push({
                    id: individu.getFamilyAsChild().getHusband().value()[0].replace(/@/g, ''),
                    type: 'blood'
                })
            }
            if (aUneMere(individu)) {
                parentsArray.push({
                    id: individu.getFamilyAsChild().getWife().value()[0].replace(/@/g, ''),
                    type: 'blood'
                })
            }
            return parentsArray;
        };
        const aUnMari = (individu) => individu.getFamilyAsSpouse()
            && individu.getFamilyAsSpouse().getHusband()
            && individu.getFamilyAsSpouse().getHusband().value()
            && individu.getFamilyAsSpouse().getHusband().value()[0];
        const aUneFemme = (individu) => individu.getFamilyAsSpouse()
            && individu.getFamilyAsSpouse().getWife()
            && individu.getFamilyAsSpouse().getWife().value()
            && individu.getFamilyAsSpouse().getWife().value()[0];
        const epoux = (individu) => {
            const epouxArray = [];
            const identifiantIndividu = individu[0].pointer.replace(/@/g, '');
            if (aUnMari(individu)) {
                const identifiantMari = individu.getFamilyAsSpouse().getHusband().value()[0].replace(/@/g, '');
                if (identifiantMari !== identifiantIndividu) {
                    epouxArray.push({
                        id: identifiantMari,
                        type: 'married'
                    });
                }
            }
            if (aUneFemme(individu)) {
                const identifiantFemme = individu.getFamilyAsSpouse().getWife().value()[0].replace(/@/g, '');
                if (identifiantFemme !== identifiantIndividu) {
                    epouxArray.push({
                        id: identifiantFemme,
                        type: 'married'
                    });
                }
            }
            return epouxArray;
        }
        const enfants = (individu) => {
            return individu.getSpouseFamilyLink().getFamilyRecord().getChild().getIndividualRecord().arraySelect().map(child => ({
                id: child[0].pointer.replace(/@/g, ''),
                type: 'blood'
            }));
        }
        const fratrie = (individu) => {
            return individu.getChildFamilyLink().getFamilyRecord().getChild().arraySelect()
                .filter(child => child.getIndividualRecord()[0].pointer !== individu[0].pointer)
                .map(child => ({
                    id: child[0].value.replace(/@/g, ''),
                    type: 'blood'
                }));
        }
        const individuDeLArbre = arbreGedcom.getIndividualRecord(identifiantIndividu);
        const parentsDeLIndividuDeLArbre = parents(individuDeLArbre);
        const epouxDeLIndividuDeLArbre = epoux(individuDeLArbre);
        const enfantsDeLIndividuDeLArbre = enfants(individuDeLArbre);
        const fratrieDeLIndividuDeLArbre = fratrie(individuDeLArbre);
        return individuDeLArbre.arraySelect().map(individu => {
            return ({
                id: individu[0].pointer.replace(/@/g, ''),
                name: individu.getName().getGivenName().value() + ' ' + individu.getName().getSurname().value(),
                gender: individu.getSex().value()[0] === 'M' ? 'male' : 'female',
                parents: parentsDeLIndividuDeLArbre,
                spouses: epouxDeLIndividuDeLArbre,
                children: enfantsDeLIndividuDeLArbre,
                siblings: fratrieDeLIndividuDeLArbre
            });
        }).concat(parentsDeLIndividuDeLArbre.map(parent => {
            const individu = arbreGedcom.getIndividualRecord('@' + parent.id + '@');
            return {
                id: parent.id,
                gender: individu.getSex().value()[0] === 'M' ? 'male' : 'female',
                name: individu.getName().getGivenName().value() + ' ' + individu.getName().getSurname().value(),
                parents: [],
                children: enfants(individu),
                spouses: epoux(individu),
                siblings: fratrie(individu)
            }
        })).concat(epouxDeLIndividuDeLArbre.map(epouxIndividu => {
            const individu = arbreGedcom.getIndividualRecord('@' + epouxIndividu.id + '@');
            return {
                id: epouxIndividu.id,
                gender: individu.getSex().value()[0] === 'M' ? 'male' : 'female',
                name: individu.getName().getGivenName().value() + ' ' + individu.getName().getSurname().value(),
                parents: [],
                children: enfants(individu),
                spouses: epoux(individu),
                siblings: fratrie(individu)
            }
        })).concat(enfantsDeLIndividuDeLArbre.map(enfant => {
            const individu = arbreGedcom.getIndividualRecord('@' + enfant.id + '@');
            return {
                id: enfant.id,
                gender: individu.getSex().value()[0] === 'M' ? 'male' : 'female',
                name: individu.getName().getGivenName().value() + ' ' + individu.getName().getSurname().value(),
                parents: parents(individu),
                children: [],
                spouses: [],
                siblings: fratrie(individu)
            }
        })).concat(fratrieDeLIndividuDeLArbre.map(enfant => {
            const individu = arbreGedcom.getIndividualRecord('@' + enfant.id + '@');
            return {
                id: enfant.id,
                gender: individu.getSex().value()[0] === 'M' ? 'male' : 'female',
                name: individu.getName().getGivenName().value() + ' ' + individu.getName().getSurname().value(),
                parents: parents(individu),
                spouses: [],
                children: [],
                siblings: fratrie(individu)
            }
        }));
    }

    return {
        arbre,
        nombreDIndividus: () => arbreGedcom.getIndividualRecord().length,
        date: () => arbreGedcom.getHeader().getFileCreationDate().valueAsExactDate()[0],
        individus: () => {
            const individus = arbreGedcom.getIndividualRecord();
            return individus.arraySelect().map(individu => ({
                id: individu[0].pointer.replace(/@/g, ''),
                nom: individu.getName().getGivenName().value() + ' ' + individu.getName().getSurname().value()
            }));
        },
        detailsIndividu: (identifiantIndividu) => {
            return {
                id: identifiantIndividu.replace(/@/g, ''),
                nom: nomIndividu(identifiantIndividu),
                sexe: sexeIndividu(identifiantIndividu),
                naissance: naissance(identifiantIndividu),
                bapteme: bapteme(identifiantIndividu),
                deces: deces(identifiantIndividu),
                fiancailles: fiancailles(identifiantIndividu),
                mariage: mariage(identifiantIndividu)
            };
        },
        nomIndividu,
        naissance,
        bapteme,
        deces,
        mariage,
        fiancailles,
        sexe: (identifiantIndividu) => sexeIndividu(identifiantIndividu),
    }
});