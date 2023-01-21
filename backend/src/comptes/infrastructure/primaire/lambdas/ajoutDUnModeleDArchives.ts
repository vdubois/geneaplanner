import {APIGatewayProxyEvent} from "aws-lambda";
import {badRequest, created, LambdaResult} from "aws-lambda-utils";
import {AjoutDUnModeleDArchives, AjouterUnModeleDArchives} from "../../../usecases/AjoutDUnModeleDArchives";
import {inject} from "typescript-inject";
import "../../configuration";
import {autoriserAdministrateur} from "../../../../commun/infrastructure/primaire/autoriserAdministrateur";

export const handler = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    return autoriserAdministrateur(event, async (event: APIGatewayProxyEvent) => {
        if (event.body) {
            const archive: AjouterUnModeleDArchives = JSON.parse(event.body);
            const ajoutDUnModeleDArchives = inject<AjoutDUnModeleDArchives>('AjoutDUnModeleDArchives');
            const resultat = await ajoutDUnModeleDArchives.executer(archive);
            return created(resultat.resultat.value());
        }
        return badRequest(`Les paramètres d'une archive sont obligatoires`);
    });
}
