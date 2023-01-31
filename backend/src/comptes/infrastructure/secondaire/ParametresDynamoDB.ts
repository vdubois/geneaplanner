import {Parametres} from "../../domaine/Parametres";
import {Parametrage} from "../../domaine/Parametrage";

export class ParametresDynamoDB implements Parametres {
    async recuperer(): Promise<Parametrage> {
        return {} as Parametrage;
    }

    // @ts-ignore
    async sauvegarder(parametrage: Parametrage): Promise<void> {

    }

}
