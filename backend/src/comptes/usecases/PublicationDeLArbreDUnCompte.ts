import {UseCase} from "../../commun/usecases/UseCase";
import {Irregularite} from "../../commun/domaine/Irregularite";
import {Commande} from "../../commun/usecases/Commande";
import {Arbres} from "../domaine/Arbres";
import {ResultatDeCommande} from "../../commun/ResultatDeCommande";
import {UnArbreAEtePublie} from "../domaine/evenements/UnArbreAEtePublie";
import {Individu} from "../domaine/Individu";

export class PublicationDeLArbreDUnCompte implements UseCase<PublierLArbreDUnCompte, ResultatDeCommande<Array<Individu>, Irregularite>> {
    constructor(private arbres: Arbres) {
    }

    async executer(commande: PublierLArbreDUnCompte): Promise<ResultatDeCommande<Array<Individu>, Irregularite>> {
        const individusDeLArbre = await this.arbres.publier(commande.identifiantDuCompte, commande.arbre);
        return ResultatDeCommande.succes(individusDeLArbre, new UnArbreAEtePublie(commande.identifiantDuCompte));
    }
}

export class PublierLArbreDUnCompte implements Commande {
    constructor(private _identifiantDuCompte: string, private _arbre: string) {
    }

    get identifiantDuCompte(): string {
        return this._identifiantDuCompte;
    }

    get arbre(): string {
        return this._arbre;
    }
}
