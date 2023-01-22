import {UseCase} from "../../commun/usecases/UseCase";
import {Irregularite} from "../../commun/domaine/Irregularite";
import {Commande} from "../../commun/usecases/Commande";
import {Arbres} from "../domaine/Arbres";
import {ResultatDeCommande} from "../../commun/ResultatDeCommande";
import {LaRacineDUnArbreAEteDefinie} from "../domaine/evenements/LaRacineDUnArbreAEteDefinie";
import {Evenement} from "../../commun/domaine/Evenement";

export class DefinitionDeLaRacineDeLArbreDUnCompte implements UseCase<DefinirLaRacineDeLArbreDUnCompte, ResultatDeCommande<Evenement, Irregularite>> {
    constructor(private arbres: Arbres) {
    }

    async executer(commande: DefinirLaRacineDeLArbreDUnCompte): Promise<ResultatDeCommande<Evenement, Irregularite>> {
        await this.arbres.definirLaRacine(commande.identifiantDuCompte, commande.identifiantDeLaRacineDeLArbre);
        return ResultatDeCommande.evenement(new LaRacineDUnArbreAEteDefinie(commande.identifiantDuCompte, commande.identifiantDeLaRacineDeLArbre));
    }
}

export class DefinirLaRacineDeLArbreDUnCompte implements Commande {
    constructor(private _identifiantDuCompte: string, private _identifiantDeLaRacineDeLArbre: string) {
    }

    get identifiantDuCompte(): string {
        return this._identifiantDuCompte;
    }

    get identifiantDeLaRacineDeLArbre(): string {
        return this._identifiantDeLaRacineDeLArbre;
    }
}
