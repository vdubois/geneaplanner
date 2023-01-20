import {Commande} from "../../commun/usecases/Commande";
import {UseCase} from "../../commun/usecases/UseCase";
import {ResultatDeCommande} from "../../commun/ResultatDeCommande";
import {Comptes} from "../domaine/Comptes";

export class RecuperationDesInformationsDUnCompte implements UseCase<RecupererLesInformationsDUnCompte, ResultatDeCommande<any, any>>{
    constructor(private comptes: Comptes) {
    }

    async executer(commande: RecupererLesInformationsDUnCompte): Promise<ResultatDeCommande<any, any>> {
        const compte = await this.comptes.recuperer(commande.identifiantDuCompte);
        return ResultatDeCommande.valeur(compte);
    }
}

export class RecupererLesInformationsDUnCompte implements Commande {
    constructor(private _identifiantDuCompte: string) {
    }

    get identifiantDuCompte(): string {
        return this._identifiantDuCompte;
    }
}
