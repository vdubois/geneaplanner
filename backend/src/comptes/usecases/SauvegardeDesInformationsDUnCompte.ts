import {Commande} from "../../commun/usecases/Commande";
import {UseCase} from "../../commun/usecases/UseCase";
import {ResultatDeCommande} from "../../commun/ResultatDeCommande";
import {Comptes} from "../domaine/Comptes";
import {Evenement} from "../../commun/domaine/Evenement";
import {Irregularite} from "../../commun/domaine/Irregularite";
import {
    LesInformationsDUnCompteOntEteSauvegardees
} from "../domaine/evenements/LesInformationsDUnCompteOntEteSauvegardees";

export class SauvegardeDesInformationsDUnCompte implements UseCase<SauvegarderLesInformationsDUnCompte, ResultatDeCommande<Evenement, Irregularite>> {
    constructor(private comptes: Comptes) {
    }

    async executer(commande: SauvegarderLesInformationsDUnCompte): Promise<ResultatDeCommande<Evenement, Irregularite>> {
        await this.comptes.sauvegarder(commande.identifiantDuCompte, commande);
        return ResultatDeCommande.evenement(new LesInformationsDUnCompteOntEteSauvegardees(commande.identifiantDuCompte, commande.googleMapsApiKey));
    }
}

export class SauvegarderLesInformationsDUnCompte implements Commande {
    constructor(private _identifiantDuCompte: string, private _googleMapsApiKey: string) {
    }

    get identifiantDuCompte(): string {
        return this._identifiantDuCompte;
    }

    get googleMapsApiKey(): string {
        return this._googleMapsApiKey;
    }
}
