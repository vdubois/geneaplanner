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
        if (evenementPresent) {
            const detailsDeLEvenement = evenementDeLIndividu.getEventMarriage();
            const lieu = detailsDeLEvenement.getPlace().value()[0];
            const date = detailsDeLEvenement.getDate().valueAsDate()[0].date;
            return {
                date,
                lieu
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

    return {
        nombreDIndividus: () => arbreGedcom.getIndividualRecord().length,
        date: () => arbreGedcom.getHeader().getFileCreationDate().valueAsExactDate()[0],
        nomIndividuRacine: () => arbreGedcom.getIndividualRecord().arraySelect()[0].getName().getGivenName().value() + ' ' + arbreGedcom.getIndividualRecord().arraySelect()[0].getName().getSurname().value(),
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
        fiancailles
    }
});