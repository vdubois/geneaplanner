import {Evenement} from "../../../commun/domaine/Evenement";

export class UnArbreAEtePublie implements Evenement {
    constructor(private _identifiantDuCompte: string) {
    }

    get identifiantDuCompte(): string {
        return this._identifiantDuCompte;
    }
}
