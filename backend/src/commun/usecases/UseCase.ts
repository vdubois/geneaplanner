import {Commande} from "./Commande";
import {ResultatDeCommande} from "../ResultatDeCommande";

export interface UseCase<T extends Commande, R extends ResultatDeCommande<any, any>> {
    executer(commande: T): Promise<R>;
}
