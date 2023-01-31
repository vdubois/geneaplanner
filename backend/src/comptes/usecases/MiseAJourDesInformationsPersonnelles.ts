import {Commande} from "../../commun/usecases/Commande";
import {UseCase} from "../../commun/usecases/UseCase";
import {ResultatDeCommande} from "../../commun/ResultatDeCommande";
import {Evenement} from "../../commun/domaine/Evenement";
import {Irregularite} from "../../commun/domaine/Irregularite";
import {Comptes} from "../domaine/Comptes";
import {
    LesInformationsPersonnellesDUnCompteOntEteMisesAJour
} from "../domaine/evenements/LesInformationsPersonnellesDUnCompteOntEteMisesAJour";

export class MiseAJourDesInformationsPersonnelles implements UseCase<MettreAJourLesInformationsPersonnelles, ResultatDeCommande<Evenement, Irregularite>> {
    constructor(private comptes: Comptes) {
    }

    async executer(commande: MettreAJourLesInformationsPersonnelles): Promise<ResultatDeCommande<Evenement, Irregularite>> {
        await this.comptes.sauvegarder(commande.identifiantDuCompte, {
            informationsPersonnelles: {
                nom: commande.nom,
                prenom: commande.prenom
            }
        })
        return ResultatDeCommande.evenement(new LesInformationsPersonnellesDUnCompteOntEteMisesAJour(commande.identifiantDuCompte, commande.nom, commande.prenom));
    }
}

export class MettreAJourLesInformationsPersonnelles implements Commande {
    constructor(private _identifiantDuCompte: string, private _nom: string, private _prenom: string) {
    }

    get identifiantDuCompte(): string {
        return this._identifiantDuCompte;
    }

    get nom(): string {
        return this._nom;
    }

    get prenom(): string {
        return this._prenom;
    }
}
