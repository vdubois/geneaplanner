import {SelectionIndividualRecord} from "read-gedcom";

export class Arbre {
    constructor(private arbreGedcom: any) {
    }

    evenementPersonnel(individu: SelectionIndividualRecord, typeDeLEvenement: string) {
        // @ts-ignore
        const evenementDeLIndividu = individu[`getEvent${typeDeLEvenement}`].apply(individu);
        const evenementPresent = evenementDeLIndividu.length > 0;
        if (evenementPresent) {
            const lieu = evenementDeLIndividu.getPlace().valueAsParts().join().replaceAll(',', ', ');
            const date = evenementDeLIndividu.getDate().valueAsDate()[0]?.date;
            return {
                date,
                lieu
            }
        }
        return null;
    }

    nomIndividu(identifiantIndividu: string): string {
        const individu = this.arbreGedcom.getIndividualRecord(identifiantIndividu);
        return individu.getName().getGivenName().value() + ' ' + individu.getName().getSurname().value();
    }

    sexeIndividu(identifiantIndividu: string): string {
        const individu = this.arbreGedcom.getIndividualRecord(identifiantIndividu);
        return individu.getSex().value()[0];
    }

    naissance(identifiantIndividu: string) {
        const individu = this.arbreGedcom.getIndividualRecord(identifiantIndividu);
        return this.evenementPersonnel(individu, 'Birth');
    }

    bapteme(identifiantIndividu: string) {
        const individu = this.arbreGedcom.getIndividualRecord(identifiantIndividu);
        return this.evenementPersonnel(individu, 'Baptism');
    }

    deces(identifiantIndividu: string) {
        const individu = this.arbreGedcom.getIndividualRecord(identifiantIndividu);
        return this.evenementPersonnel(individu, 'Death');
    }

    mariage(identifiantIndividu: string) {
        const individu = this.arbreGedcom.getIndividualRecord(identifiantIndividu);
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
        return null;
    }

    fiancailles(identifiantIndividu: string) {
        const individu = this.arbreGedcom.getIndividualRecord(identifiantIndividu);
        const evenementDeLIndividu = individu.getFamilyAsSpouse();
        const evenementPresent = evenementDeLIndividu.length > 0
            && evenementDeLIndividu.getEventEngagement().length > 0;
        const sexe = individu.getSex().value()[0];
        if (evenementPresent) {
            const detailsDeLEvenement = evenementDeLIndividu.getEventEngagement();
            const lieu = detailsDeLEvenement.getPlace().value()[0];
            const date = detailsDeLEvenement.getDate().valueAsDate()[0]?.date;
            return {
                date,
                lieu,
                fiance: sexe === 'M' ? evenementDeLIndividu.getWife().getIndividualRecord().getName().getGivenName().value() + ' ' + evenementDeLIndividu.getWife().getIndividualRecord().getName().getSurname().value()
                    : evenementDeLIndividu.getHusband().getIndividualRecord().getName().getGivenName().value() + ' ' + evenementDeLIndividu.getHusband().getIndividualRecord().getName().getSurname().value()
            }
        }
        return null;
    }

    arbre(identifiantIndividu: string) {
        const aUnPere = (individu: SelectionIndividualRecord) => individu.getFamilyAsChild()
            && individu.getFamilyAsChild().getHusband()
            && individu.getFamilyAsChild().getHusband().value()
            && individu.getFamilyAsChild().getHusband().value()[0];
        const aUneMere = (individu: SelectionIndividualRecord) => individu.getFamilyAsChild()
            && individu.getFamilyAsChild().getWife()
            && individu.getFamilyAsChild().getWife().value()
            && individu.getFamilyAsChild().getWife().value()[0];
        const parents = (individu: SelectionIndividualRecord) => {
            const parentsArray = [];
            if (aUnPere(individu)) {
                parentsArray.push({
                    id: individu.getFamilyAsChild().getHusband().value()[0]?.replace(/@/g, ''),
                    type: 'blood'
                })
            }
            if (aUneMere(individu)) {
                parentsArray.push({
                    id: individu.getFamilyAsChild().getWife().value()[0]?.replace(/@/g, ''),
                    type: 'blood'
                })
            }
            return parentsArray;
        };
        const aUnMari = (individu: SelectionIndividualRecord) => individu.getFamilyAsSpouse()
            && individu.getFamilyAsSpouse().getHusband()
            && individu.getFamilyAsSpouse().getHusband().value()
            && individu.getFamilyAsSpouse().getHusband().value()[0];
        const aUneFemme = (individu: SelectionIndividualRecord) => individu.getFamilyAsSpouse()
            && individu.getFamilyAsSpouse().getWife()
            && individu.getFamilyAsSpouse().getWife().value()
            && individu.getFamilyAsSpouse().getWife().value()[0];
        const epoux = (individu: SelectionIndividualRecord) => {
            const epouxArray = [];
            const identifiantIndividu = individu[0].pointer?.replace(/@/g, '');
            if (aUnMari(individu)) {
                const identifiantMari = individu.getFamilyAsSpouse().getHusband().value()[0]?.replace(/@/g, '');
                if (identifiantMari !== identifiantIndividu) {
                    epouxArray.push({
                        id: identifiantMari,
                        type: 'married'
                    });
                }
            }
            if (aUneFemme(individu)) {
                const identifiantFemme = individu.getFamilyAsSpouse().getWife().value()[0]?.replace(/@/g, '');
                if (identifiantFemme !== identifiantIndividu) {
                    epouxArray.push({
                        id: identifiantFemme,
                        type: 'married'
                    });
                }
            }
            return epouxArray;
        }
        const enfants = (individu: SelectionIndividualRecord) => {
            return individu.getSpouseFamilyLink().getFamilyRecord().getChild().getIndividualRecord().arraySelect().map(child => ({
                id: child[0].pointer?.replace(/@/g, ''),
                type: 'blood'
            }));
        }
        const fratrie = (individu: SelectionIndividualRecord) => {
            return individu.getChildFamilyLink().getFamilyRecord().getChild().arraySelect()
                .filter(child => child.getIndividualRecord()[0].pointer !== individu[0].pointer)
                .map(child => ({
                    id: child[0].value?.replace(/@/g, ''),
                    type: 'blood'
                }));
        }
        const individuDeLArbre = this.arbreGedcom.getIndividualRecord(identifiantIndividu);
        const parentsDeLIndividuDeLArbre = parents(individuDeLArbre);
        const epouxDeLIndividuDeLArbre = epoux(individuDeLArbre);
        const enfantsDeLIndividuDeLArbre = enfants(individuDeLArbre);
        const fratrieDeLIndividuDeLArbre = fratrie(individuDeLArbre);
        return individuDeLArbre.arraySelect().map((individu: SelectionIndividualRecord) => {
            return ({
                id: individu[0].pointer?.replace(/@/g, ''),
                name: individu.getName().getGivenName().value() + ' ' + individu.getName().getSurname().value(),
                gender: individu.getSex().value()[0] === 'M' ? 'male' : 'female',
                parents: parentsDeLIndividuDeLArbre,
                spouses: epouxDeLIndividuDeLArbre,
                children: enfantsDeLIndividuDeLArbre,
                siblings: fratrieDeLIndividuDeLArbre,
                naissance: this.naissance(individu[0].pointer!),
                bapteme: this.bapteme(individu[0].pointer!),
                fiancailles: this.fiancailles(individu[0].pointer!),
                mariage: this.mariage(individu[0].pointer!),
                deces: this.deces(individu[0].pointer!)
            });
        }).concat(parentsDeLIndividuDeLArbre.map(parent => {
            const individu = this.arbreGedcom.getIndividualRecord('@' + parent.id + '@');
            return {
                id: parent.id,
                gender: individu.getSex().value()[0] === 'M' ? 'male' : 'female',
                name: individu.getName().getGivenName().value() + ' ' + individu.getName().getSurname().value(),
                parents: [],
                children: enfants(individu),
                spouses: epoux(individu),
                siblings: fratrie(individu),
                naissance: this.naissance('@' + parent.id + '@'),
                bapteme: this.bapteme('@' + parent.id + '@'),
                fiancailles: this.fiancailles('@' + parent.id + '@'),
                mariage: this.mariage('@' + parent.id + '@'),
                deces: this.deces('@' + parent.id + '@')
            }
        })).concat(epouxDeLIndividuDeLArbre.map(epouxIndividu => {
            const individu = this.arbreGedcom.getIndividualRecord('@' + epouxIndividu.id + '@');
            return {
                id: epouxIndividu.id,
                gender: individu.getSex().value()[0] === 'M' ? 'male' : 'female',
                name: individu.getName().getGivenName().value() + ' ' + individu.getName().getSurname().value(),
                parents: [],
                children: enfants(individu),
                spouses: epoux(individu),
                siblings: fratrie(individu),
                naissance: this.naissance('@' + epouxIndividu.id + '@'),
                bapteme: this.bapteme('@' + epouxIndividu.id + '@'),
                fiancailles: this.fiancailles('@' + epouxIndividu.id + '@'),
                mariage: this.mariage('@' + epouxIndividu.id + '@'),
                deces: this.deces('@' + epouxIndividu.id + '@')
            }
        })).concat(enfantsDeLIndividuDeLArbre.map(enfant => {
            const individu = this.arbreGedcom.getIndividualRecord('@' + enfant.id + '@');
            return {
                id: enfant.id,
                gender: individu.getSex().value()[0] === 'M' ? 'male' : 'female',
                name: individu.getName().getGivenName().value() + ' ' + individu.getName().getSurname().value(),
                parents: parents(individu),
                children: [],
                spouses: [],
                siblings: fratrie(individu),
                naissance: this.naissance('@' + enfant.id + '@'),
                bapteme: this.bapteme('@' + enfant.id + '@'),
                fiancailles: this.fiancailles('@' + enfant.id + '@'),
                mariage: this.mariage('@' + enfant.id + '@'),
                deces: this.deces('@' + enfant.id + '@')
            }
        })).concat(fratrieDeLIndividuDeLArbre.map(enfant => {
            const individu = this.arbreGedcom.getIndividualRecord('@' + enfant.id + '@');
            return {
                id: enfant.id,
                gender: individu.getSex().value()[0] === 'M' ? 'male' : 'female',
                name: individu.getName().getGivenName().value() + ' ' + individu.getName().getSurname().value(),
                parents: parents(individu),
                spouses: [],
                children: [],
                siblings: fratrie(individu),
                naissance: this.naissance('@' + enfant.id + '@'),
                bapteme: this.bapteme('@' + enfant.id + '@'),
                fiancailles: this.fiancailles('@' + enfant.id + '@'),
                mariage: this.mariage('@' + enfant.id + '@'),
                deces: this.deces('@' + enfant.id + '@')
            }
        }));
    }

    nombreDIndividus(): number {
        return this.arbreGedcom.getIndividualRecord().length;
    }

    date(): string {
        return this.arbreGedcom.getHeader().getFileCreationDate().valueAsExactDate()[0];
    }

    individus() {
        const individus = this.arbreGedcom.getIndividualRecord();
        return individus.arraySelect().map((individu: SelectionIndividualRecord) => ({
            id: individu[0].pointer?.replace(/@/g, ''),
            nom: individu.getName().getGivenName().value() + ' ' + individu.getName().getSurname().value()
        }));
    }

    detailsIndividu(identifiantIndividu: string) {
        return {
            id: identifiantIndividu.replace(/@/g, ''),
            nom: this.nomIndividu(identifiantIndividu),
            sexe: this.sexeIndividu(identifiantIndividu),
            naissance: this.naissance(identifiantIndividu),
            bapteme: this.bapteme(identifiantIndividu),
            deces: this.deces(identifiantIndividu),
            fiancailles: this.fiancailles(identifiantIndividu),
            mariage: this.mariage(identifiantIndividu)
        };
    }

    // FIXME à dégager
    sexe(identifiantIndividu: string) {
        return this.sexeIndividu(identifiantIndividu);
    }
}
