import {APIGatewayProxyEvent} from "aws-lambda";
import {LambdaResult, ok} from "aws-lambda-utils";
import {Utilisateur} from "../../../../commun/infrastructure/primaire/Utilisateur";
import '../../configuration';
import {autoriserUtilisateur} from "../../../../commun/infrastructure/primaire/autoriserUtilisateur";

// @ts-ignore
export const handler = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    // @ts-ignore
    return autoriserUtilisateur(event, async (event: APIGatewayProxyEvent, utilisateur: Utilisateur) => {
        try {
            //const parametres = JSON.parse(event.body!);
            //const sauvegardeDesInformationsDUnCompte = inject<SauvegardeDesInformationsDUnCompte>('SauvegardeDesInformationsDUnCompte');
            //await sauvegardeDesInformationsDUnCompte.executer(new SauvegarderLesInformationsDUnCompte(utilisateur.email, parametres.apiKey));
            return ok(true);
        } catch (erreur) {
            console.error(erreur);
            return ok(false);
        }
    });
}
