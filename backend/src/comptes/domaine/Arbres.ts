export interface Arbres {
    existe(identifiantDuCompte: string): Promise<boolean>;
    supprimer(identifiantDuCompte: string): Promise<void>;
}
