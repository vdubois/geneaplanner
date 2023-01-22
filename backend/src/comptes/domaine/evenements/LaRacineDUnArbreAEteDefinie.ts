import {Evenement} from "../../../commun/domaine/Evenement";

export class LaRacineDUnArbreAEteDefinie implements Evenement {
    constructor(private _identifiantDuCompte: string, private _identifiantDeLaRacineDeLArbre: string) {
    }

    get identifiantDuCompte(): string {
        return this._identifiantDuCompte;
    }

    get identifiantDeLaRacineDeLArbre(): string {
        return this._identifiantDeLaRacineDeLArbre;
    }
}
