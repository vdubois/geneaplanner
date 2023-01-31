import {Commande} from "../../commun/usecases/Commande";
import {UseCase} from "../../commun/usecases/UseCase";
import {ResultatDeCommande} from "../../commun/ResultatDeCommande";
import {Comptes} from "../domaine/Comptes";
import {Compte} from "../domaine/Compte";
import {Irregularite} from "../../commun/domaine/Irregularite";

export class RecuperationDesInformationsPersonnelles implements UseCase<RecupererLesInformationsPersonnelles, ResultatDeCommande<Compte, Irregularite>>{
    constructor(private comptes: Comptes) {
    }

    async executer(commande: RecupererLesInformationsPersonnelles): Promise<ResultatDeCommande<Compte, Irregularite>> {
        const compte = await this.comptes.recuperer(commande.identifiantDuCompte);
        return ResultatDeCommande.valeur(compte);
    }
}

export class RecupererLesInformationsPersonnelles implements Commande {
    constructor(private _identifiantDuCompte: string) {
    }

    get identifiantDuCompte(): string {
        return this._identifiantDuCompte;
    }
}
