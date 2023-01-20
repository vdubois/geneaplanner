import {UseCase} from "../../commun/usecases/UseCase";
import {Commande} from "../../commun/usecases/Commande";
import {ResultatDeCommande} from "../../commun/ResultatDeCommande";
import {Arbres} from "../domaine/Arbres";
import {UnArbreAEteSupprime} from "../domaine/evenements/UnArbreAEteSupprime";
import {Evenement} from "../../commun/domaine/Evenement";
import {LeCompteNeDisposePasDArbre} from "../domaine/irregularites/LeCompteNeDisposePasDArbre";

export class SuppressionDeLArbreDUnCompte implements UseCase<SupprimerLArbreDUnCompte, ResultatDeCommande<Evenement, any>> {

    constructor(private arbres: Arbres) {
    }

    async executer(commande: SupprimerLArbreDUnCompte): Promise<ResultatDeCommande<Evenement, any>> {
        const arbreExiste = await this.arbres.existe(commande.identifiantDuCompte);
        if (arbreExiste) {
            await this.arbres.supprimer(commande.identifiantDuCompte);
            return ResultatDeCommande.evenement(new UnArbreAEteSupprime(commande.identifiantDuCompte));
        }
        return ResultatDeCommande.irregularite(new LeCompteNeDisposePasDArbre());
    }
}

export class SupprimerLArbreDUnCompte implements Commande {

    constructor(private _identifiantDuCompte: string) {
    }

    get identifiantDuCompte(): string {
        return this._identifiantDuCompte;
    }
}
