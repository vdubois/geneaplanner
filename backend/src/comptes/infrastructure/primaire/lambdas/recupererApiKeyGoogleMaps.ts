import {APIGatewayProxyEvent} from "aws-lambda";
import {LambdaResult} from "aws-lambda-utils";
import {Utilisateur} from "../../../../commun/infrastructure/primaire/Utilisateur";
import '../../configuration';
import {autoriserUtilisateur} from "../../../../commun/infrastructure/primaire/autoriserUtilisateur";

// @ts-ignore
export const handler = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    // @ts-ignore
    return autoriserUtilisateur(event, async (event: APIGatewayProxyEvent, utilisateur: Utilisateur) => {
        /*const recuperationDesInformationsDUnCompte = inject<RecuperationDesInformationsDUnCompte>('RecuperationDesInformationsDUnCompte');
        const compte = await recuperationDesInformationsDUnCompte.executer(new RecupererLesInformationsDUnCompte(utilisateur.email));
        return ok({googleMapsApiKey: compte.resultat.value().googleMapsApiKey});*/
    });
}
