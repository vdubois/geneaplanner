import {Evenement} from "../../../commun/domaine/Evenement";

export class UnModeleDArchivesAEteSupprime implements Evenement {
    constructor(private _identifiant: string) {
    }

    get identifiant(): string {
        return this._identifiant;
    }
}
