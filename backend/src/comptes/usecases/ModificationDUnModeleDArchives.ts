import {UseCase} from "../../commun/usecases/UseCase";
import {ResultatDeCommande} from "../../commun/ResultatDeCommande";
import {Irregularite} from "../../commun/domaine/Irregularite";
import {ModelesDArchives} from "../domaine/ModelesDArchives";
import {ModeleDArchives} from "../domaine/ModeleDArchives";
import {IdentifiantDeModeleDArchives} from "../domaine/IdentifiantDeModeleDArchives";
import {UnModeleDArchivesAEteModifie} from "../domaine/evenements/UnModeleDArchivesAEteModifie";

export class ModificationDUnModeleDArchives implements UseCase<ModifierUnModeleDArchives, ResultatDeCommande<ModeleDArchives, Irregularite>> {

    constructor(private modelesDArchives: ModelesDArchives) {
    }

    async executer(commande: ModifierUnModeleDArchives): Promise<ResultatDeCommande<ModeleDArchives, Irregularite>> {
        const modeleDArchives = await this.modelesDArchives.recuperer(new IdentifiantDeModeleDArchives(commande.identifiantDuModeleDArchives));
        if (modeleDArchives.isFailure()) {
            return ResultatDeCommande.irregularite(modeleDArchives.error());
        }
        await this.modelesDArchives.modifier(new IdentifiantDeModeleDArchives(commande.identifiantDuModeleDArchives), commande);
        return ResultatDeCommande.succes(
            commande,
            new UnModeleDArchivesAEteModifie(
                commande.identifiantDuModeleDArchives,
                commande.adresse,
                commande.siteInternet,
                commande.libelle,
                commande.siteInternetEtatCivil));
    }
}

export class ModifierUnModeleDArchives {
    constructor(private _identifiantDuModeleDArchives: string, private _adresse: string, private _siteInternet: string, private _libelle: string, private _siteInternetEtatCivil: string) {
    }

    get identifiantDuModeleDArchives(): string {
        return this._identifiantDuModeleDArchives;
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
