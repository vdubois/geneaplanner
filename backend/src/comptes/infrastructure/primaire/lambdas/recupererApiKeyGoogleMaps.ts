import {APIGatewayProxyEvent} from "aws-lambda";
import {LambdaResult, ok, unauthorized} from "aws-lambda-utils";
import {Utilisateur} from "../../../../commun/infrastructure/primaire/Utilisateur";
import {inject} from "typescript-inject";
import {
    RecuperationDesInformationsDUnCompte,
    RecupererLesInformationsDUnCompte
} from "../../../usecases/RecuperationDesInformationsDUnCompte";
import '../../configuration';

// @ts-ignore
export const handler = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    const utilisateur = new Utilisateur(event);
    if (utilisateur.estNonAutorise()) {
        return unauthorized(`Non autorisé pour le compte ${utilisateur.email}`);
    }
    const recuperationDesInformationsDUnCompte = inject<RecuperationDesInformationsDUnCompte>('RecuperationDesInformationsDUnCompte');
    const compte = await recuperationDesInformationsDUnCompte.executer(new RecupererLesInformationsDUnCompte(utilisateur.email));
    return ok({googleMapsApiKey: compte.resultat.value().googleMapsApiKey});
}
