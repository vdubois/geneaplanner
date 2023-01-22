import {LambdaResult, ok} from "aws-lambda-utils";
import {APIGatewayProxyEvent} from "aws-lambda";
import {Utilisateur} from "../../../../commun/infrastructure/primaire/Utilisateur";
import {inject} from "typescript-inject";
import '../../configuration';
import {autoriserUtilisateur} from "../../../../commun/infrastructure/primaire/autoriserUtilisateur";
import {PublicationDeLArbreDUnCompte, PublierLArbreDUnCompte} from "../../../usecases/PublicationDeLArbreDUnCompte";

export const handler = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    // @ts-ignore
    return autoriserUtilisateur(event, async (event: APIGatewayProxyEvent, utilisateur: Utilisateur): Promise<LambdaResult> => {
        const publicationDUnArbre = inject<PublicationDeLArbreDUnCompte>('PublicationDeLArbreDUnCompte');
        const resultat = await publicationDUnArbre.executer(new PublierLArbreDUnCompte(utilisateur.email, event.body as string));
        return ok({
            individus: resultat.resultat.value()
        });
    });
}
