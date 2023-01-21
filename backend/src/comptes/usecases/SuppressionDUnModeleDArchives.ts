import {UseCase} from "../../commun/usecases/UseCase";
import {ResultatDeCommande} from "../../commun/ResultatDeCommande";
import {Irregularite} from "../../commun/domaine/Irregularite";
import {ModelesDArchives} from "../domaine/ModelesDArchives";
import {IdentifiantDeModeleDArchives} from "../domaine/IdentifiantDeModeleDArchives";
import {UnModeleDArchivesAEteSupprime} from "../domaine/evenements/UnModeleDArchivesAEteSupprime";
import {Evenement} from "../../commun/domaine/Evenement";

export class SuppressionDUnModeleDArchives implements UseCase<SupprimerUnModeleDArchives, ResultatDeCommande<Evenement, Irregularite>> {

    constructor(private modelesDArchives: ModelesDArchives) {
    }

    async executer(commande: SupprimerUnModeleDArchives): Promise<ResultatDeCommande<Evenement, Irregularite>> {
        await this.modelesDArchives.supprimer(new IdentifiantDeModeleDArchives(commande.identifiant));
        return ResultatDeCommande.evenement(new UnModeleDArchivesAEteSupprime(commande.identifiant));
    }
}

export class SupprimerUnModeleDArchives {
    constructor(private _identifiant: string) {
    }

    get identifiant(): string {
        return this._identifiant;
    }
}
