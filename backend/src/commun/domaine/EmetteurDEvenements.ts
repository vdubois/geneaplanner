import {Evenement} from "./Evenement";

export interface EmetteurDEvenements {
    emettre(evenement: Evenement): void;
}

export class EmetteurDEvenementsFake implements EmetteurDEvenements {
    private evenements: Array<Evenement> = [];

    emettre(evenement: Evenement): void {
        this.evenements.push(evenement);
    }
}
