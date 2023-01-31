import {Parametrage} from "./Parametrage";

export interface Parametres {
    recuperer(): Promise<Parametrage>;
    sauvegarder(parametrage: Parametrage): Promise<void>;
}
