import {Commande} from "./Commande";
import {ResultatDeCommande} from "../ResultatDeCommande";
import {UseCase} from "./UseCase";
import {EmetteurDEvenements} from "../domaine/EmetteurDEvenements";

export class UseCaseEvenementiel<T extends Commande, R extends ResultatDeCommande<any, any>> implements UseCase<T, R> {

    constructor(private useCase: UseCase<T, R>, private emetteurDEvenements: EmetteurDEvenements) {
    }

    async executer(commande: T): Promise<R> {
        const resultat = await this.useCase.executer(commande);
        resultat.evenementsProduits.forEach(evenement => this.emetteurDEvenements.emettre(evenement));
        return resultat;
    }
}
