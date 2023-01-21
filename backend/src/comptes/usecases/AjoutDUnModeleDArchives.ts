import {UseCase} from "../../commun/usecases/UseCase";
import {ResultatDeCommande} from "../../commun/ResultatDeCommande";
import {Irregularite} from "../../commun/domaine/Irregularite";
import {ModelesDArchives} from "../domaine/ModelesDArchives";
import {UnModeleDArchivesAEteAjoute} from "../domaine/evenements/UnModeleDArchivesAEteAjoute";
import {ModeleDArchives} from "../domaine/ModeleDArchives";

export class AjoutDUnModeleDArchives implements UseCase<AjouterUnModeleDArchives, ResultatDeCommande<ModeleDArchives, Irregularite>> {

    constructor(private modelesDArchives: ModelesDArchives) {
    }

    async executer(commande: AjouterUnModeleDArchives): Promise<ResultatDeCommande<ModeleDArchives, Irregularite>> {
        const modeleDArchivesAjoute = await this.modelesDArchives.ajouter(commande);
        return ResultatDeCommande.succes(
            modeleDArchivesAjoute,
            new UnModeleDArchivesAEteAjoute(
                modeleDArchivesAjoute.id!,
                modeleDArchivesAjoute.adresse,
                modeleDArchivesAjoute.siteInternet,
                modeleDArchivesAjoute.libelle,
                modeleDArchivesAjoute.siteInternetEtatCivil));
    }
}

export class AjouterUnModeleDArchives {
    constructor(private _adresse: string, private _siteInternet: string, private _libelle: string, private _siteInternetEtatCivil: string) {
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
