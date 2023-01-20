import {Result} from "./Result";
import {Evenement} from "./domaine/Evenement";
import {AucunEvenementEmis} from "./domaine/AucunEvenementEmis";
import {Irregularite} from "./domaine/Irregularite";

export class ResultatDeCommande<T, E> {
    resultat: Result<T, E>;
    evenementsProduits: Evenement[];

    constructor(resultat: Result<T, E>, evenementsProduits: Evenement[]) {
        if (!resultat) {
            throw new Error("Un résultat de commande ne peut pas avoir un résultat null");
        }
        if (!evenementsProduits) {
            throw new Error("Un résultat de commande ne peut pas avoir une liste d'événements produits null");
        }

        this.resultat = resultat;
        this.evenementsProduits = evenementsProduits;
    }

    static pasDeValeur<E>(): ResultatDeCommande<Evenement, E> {
        return ResultatDeCommande.evenement(new AucunEvenementEmis());
    }

    static evenement<E>(evenementProduit: Evenement): ResultatDeCommande<Evenement, E> {
        return ResultatDeCommande.succes(evenementProduit, evenementProduit);
    }

    static succes<T, E>(value: T, evenementProduit: Evenement): ResultatDeCommande<T, E> {
        return new ResultatDeCommande(Result.success(value), [evenementProduit]);
    }

    static valeur<T, E>(value: T): ResultatDeCommande<T, E> {
        return new ResultatDeCommande(Result.success(value), []);
    }

    static echecAvecEvenement<T>(evenementProduit: Evenement): ResultatDeCommande<T, Evenement> {
        return ResultatDeCommande.echec(evenementProduit, evenementProduit);
    }

    static irregularite<T, E extends Irregularite>(irregularite: E): ResultatDeCommande<T, E> {
        return new ResultatDeCommande(Result.failure(irregularite), []);
    }

    static echec<T, E>(irregularite: E, evenementProduit: Evenement): ResultatDeCommande<T, E> {
        return new ResultatDeCommande(Result.failure(irregularite), [evenementProduit]);
    }

    isSuccess(): boolean {
        return this.resultat.isSuccess();
    }

    isFailure(): boolean {
        return this.resultat.isFailure();
    }
}
