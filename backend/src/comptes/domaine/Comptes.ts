import {Compte} from "./Compte";

export interface Comptes {
    recuperer(identifiantDuCompte: string): Promise<Compte>;
    sauvegarder(identifiantDuCompte: string, informationsDuCompte: Compte): Promise<void>;
}
