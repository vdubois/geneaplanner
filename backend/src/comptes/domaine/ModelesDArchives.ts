import {ModeleDArchives} from "./ModeleDArchives";
import {IdentifiantDeModeleDArchives} from "./IdentifiantDeModeleDArchives";
import {Result} from "../../commun/Result";
import {ModeleDArchivesInexistant} from "./irregularites/ModeleDArchivesInexistant";

export interface ModelesDArchives {
    recuperer(identifiant: IdentifiantDeModeleDArchives): Promise<Result<ModeleDArchives, ModeleDArchivesInexistant>>;
    ajouter(modeleDArchives: ModeleDArchives): Promise<ModeleDArchives>;
    modifier(identifiant: IdentifiantDeModeleDArchives, modeleDArchives: ModeleDArchives): Promise<void>;
    supprimer(identifiant: IdentifiantDeModeleDArchives): Promise<void>;
}
