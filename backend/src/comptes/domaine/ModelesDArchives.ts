import {ModeleDArchives} from "./ModeleDArchives";
import {IdentifiantDeModeleDArchives} from "./IdentifiantDeModeleDArchives";

export interface ModelesDArchives {
    ajouter(modeleDArchives: ModeleDArchives): Promise<ModeleDArchives>;
    supprimer(identifiant: IdentifiantDeModeleDArchives): Promise<void>;
}
