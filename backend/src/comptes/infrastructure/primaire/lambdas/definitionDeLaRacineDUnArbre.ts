import {badRequest, created, LambdaResult} from "aws-lambda-utils";
import {APIGatewayProxyEvent} from "aws-lambda";
import {Utilisateur} from "../../../../commun/infrastructure/primaire/Utilisateur";
import {inject} from "typescript-inject";
import '../../configuration';
import {autoriserUtilisateur} from "../../../../commun/infrastructure/primaire/autoriserUtilisateur";
import {
    DefinirLaRacineDeLArbreDUnCompte,
    DefinitionDeLaRacineDeLArbreDUnCompte
} from "../../../usecases/DefinitionDeLaRacineDeLArbreDUnCompte";

export const handler = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    // @ts-ignore
    return autoriserUtilisateur(event, async (event: APIGatewayProxyEvent, utilisateur: Utilisateur): Promise<LambdaResult> => {

        if (event.body) {
            const racine = JSON.parse(event.body);
            const definitionDeLaRacineDUnArbre = inject<DefinitionDeLaRacineDeLArbreDUnCompte>('DefinitionDeLaRacineDeLArbreDUnCompte');
            await definitionDeLaRacineDUnArbre.executer(new DefinirLaRacineDeLArbreDUnCompte(utilisateur.email, racine.id));
            return created(racine);
        }
        return badRequest('Les informations de la racine sont obligatoires');
    });
}
