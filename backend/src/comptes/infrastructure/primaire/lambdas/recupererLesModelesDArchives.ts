import {LambdaResult} from "aws-lambda-utils";
import {APIGatewayProxyEvent} from "aws-lambda";
import {Utilisateur} from "../../../../commun/infrastructure/primaire/Utilisateur";
import '../../configuration';
import {autoriserUtilisateur} from "../../../../commun/infrastructure/primaire/autoriserUtilisateur";

export const handler = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    // @ts-ignore
    return autoriserUtilisateur(event, async (event: APIGatewayProxyEvent, utilisateur: Utilisateur): Promise<LambdaResult> => {
        /*const recuperationDesInformationsDUnCompte = inject<RecuperationDesInformationsDUnCompte>('RecuperationDesInformationsDUnCompte');
        const compte = await recuperationDesInformationsDUnCompte.executer(new RecupererLesInformationsDUnCompte(utilisateur.email));
        return ok(compte.resultat.value().modelesDArchives);*/
    });
}
