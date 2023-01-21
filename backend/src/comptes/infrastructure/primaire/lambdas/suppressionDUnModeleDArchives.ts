import {APIGatewayProxyEvent} from "aws-lambda";
import {LambdaResult, noContent} from "aws-lambda-utils";
import {inject} from "typescript-inject";
import "../../configuration";
import {autoriserAdministrateur} from "../../../../commun/infrastructure/primaire/autoriserAdministrateur";
import {
    SuppressionDUnModeleDArchives,
    SupprimerUnModeleDArchives
} from "../../../usecases/SuppressionDUnModeleDArchives";

export const handler = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    return autoriserAdministrateur(event, async (event: APIGatewayProxyEvent) => {
        const suppressionDUnModeleDArchives = inject<SuppressionDUnModeleDArchives>('SuppressionDUnModeleDArchives');
        await suppressionDUnModeleDArchives.executer(new SupprimerUnModeleDArchives(event.pathParameters?.identifiantArchive!));
        return noContent();
    });
}
