import {LambdaResult, noContent, notFound} from "aws-lambda-utils";
import {APIGatewayProxyEvent} from "aws-lambda";
import {Utilisateur} from "../../../../commun/infrastructure/primaire/Utilisateur";
import {inject} from "typescript-inject";
import '../../configuration';
import {autoriserUtilisateur} from "../../../../commun/infrastructure/primaire/autoriserUtilisateur";
import {SuppressionDeLArbreDUnCompte, SupprimerLArbreDUnCompte} from "../../../usecases/SuppressionDeLArbreDUnCompte";

export const handler = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    // @ts-ignore
    return autoriserUtilisateur(event, async (event: APIGatewayProxyEvent, utilisateur: Utilisateur): Promise<LambdaResult> => {
        const suppressionDUnArbre = inject<SuppressionDeLArbreDUnCompte>('SuppressionDeLArbreDUnCompte');
        const resultat = await suppressionDUnArbre.executer(new SupprimerLArbreDUnCompte(utilisateur.email));
        if (resultat.isFailure()) {
            return notFound('Arbre non existant');
        }
        return noContent();
    });
}
