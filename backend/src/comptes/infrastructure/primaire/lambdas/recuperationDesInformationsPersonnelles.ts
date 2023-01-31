import {APIGatewayProxyEvent} from "aws-lambda";
import {LambdaResult, ok} from "aws-lambda-utils";
import {Utilisateur} from "../../../../commun/infrastructure/primaire/Utilisateur";
import '../../configuration';
import {autoriserUtilisateur} from "../../../../commun/infrastructure/primaire/autoriserUtilisateur";
import {inject} from "typescript-inject";
import {
    RecuperationDesInformationsPersonnelles,
    RecupererLesInformationsPersonnelles
} from "../../../usecases/RecuperationDesInformationsPersonnelles";

// @ts-ignore
export const handler = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    // @ts-ignore
    return autoriserUtilisateur(event, async (event: APIGatewayProxyEvent, utilisateur: Utilisateur) => {
        try {
            const recuperationDesDonneesPersonnelles = inject<RecuperationDesInformationsPersonnelles>('RecuperationDesInformationsPersonnelles');
            const compte = await recuperationDesDonneesPersonnelles.executer(new RecupererLesInformationsPersonnelles(utilisateur.email));
            return ok(compte.resultat.value().informationsPersonnelles);
        } catch (erreur) {
            console.error(erreur);
            return ok(false);
        }
    });
}
