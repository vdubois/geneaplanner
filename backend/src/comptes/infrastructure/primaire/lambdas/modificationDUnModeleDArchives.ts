import {APIGatewayProxyEvent} from "aws-lambda";
import {badRequest, LambdaResult, ok} from "aws-lambda-utils";
import {inject} from "typescript-inject";
import "../../configuration";
import {autoriserAdministrateur} from "../../../../commun/infrastructure/primaire/autoriserAdministrateur";
import {
    ModificationDUnModeleDArchives,
    ModifierUnModeleDArchives
} from "../../../usecases/ModificationDUnModeleDArchives";

export const handler = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    return autoriserAdministrateur(event, async (event: APIGatewayProxyEvent) => {
        if (event.body) {
            const commande: ModifierUnModeleDArchives = {
                ...JSON.parse(event.body),
                identifiantDuModeleDArchives: event.pathParameters?.identifiantArchive
            };
            const modificationDUnModeleDArchives = inject<ModificationDUnModeleDArchives>('ModificationDUnModeleDArchives');
            const resultat = await modificationDUnModeleDArchives.executer(commande);
            if (resultat.isSuccess()) {
                return ok(commande);
            }
        }
        return badRequest("Le modèle d'archives correspondant n'existe pas");
    });
}
