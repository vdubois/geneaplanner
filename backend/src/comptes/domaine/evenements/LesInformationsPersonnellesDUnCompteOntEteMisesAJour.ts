import {Evenement} from "../../../commun/domaine/Evenement";

export class LesInformationsPersonnellesDUnCompteOntEteMisesAJour implements Evenement {
    constructor(private _identifiantDuCompte: string, private _nom: string, private _prenom: string) {
    }

    get identifiantDuCompte(): string {
        return this._identifiantDuCompte;
    }

    get nom(): string {
        return this._nom;
    }

    get prenom(): string {
        return this._prenom;
    }
}
