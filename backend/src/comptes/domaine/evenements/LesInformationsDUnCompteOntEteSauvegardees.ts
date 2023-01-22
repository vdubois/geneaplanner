import {Evenement} from "../../../commun/domaine/Evenement";

export class LesInformationsDUnCompteOntEteSauvegardees implements Evenement {
    constructor(private _identifiantDuCompte: string, private _googleMapsApiKey: string) {
    }

    get identifiantDuCompte(): string {
        return this._identifiantDuCompte;
    }

    get googleMapsApiKey(): string {
        return this._googleMapsApiKey;
    }
}
