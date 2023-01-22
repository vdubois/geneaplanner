import {Individu} from "./Individu";

export interface Arbres {
    existe(identifiantDuCompte: string): Promise<boolean>;
    publier(identifiantDuCompte: string, arbre: string): Promise<Array<Individu>>;
    definirLaRacine(identifiantDuCompte: string, identifiantDeLaRacineDeLArbre: string): Promise<void>;
    supprimer(identifiantDuCompte: string): Promise<void>;
}
