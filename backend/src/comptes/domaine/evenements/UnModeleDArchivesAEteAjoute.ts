import {Evenement} from "../../../commun/domaine/Evenement";

export class UnModeleDArchivesAEteAjoute implements Evenement {
    constructor(private _identifiant: string, private _adresse: string, private _siteInternet: string, private _libelle: string, private _siteInternetEtatCivil: string) {
    }

    get identifiant(): string {
        return this._identifiant;
    }

    get adresse(): string {
        return this._adresse;
    }

    get siteInternet(): string {
        return this._siteInternet;
    }

    get libelle(): string {
        return this._libelle;
    }

    get siteInternetEtatCivil() {
        return this._siteInternetEtatCivil;
    }
}
