import {APIGatewayProxyEvent} from "aws-lambda";
import {badRequest, LambdaResult, ok} from "aws-lambda-utils";
import {Utilisateur} from "../../../../commun/infrastructure/primaire/Utilisateur";
import '../../configuration';
import {autoriserUtilisateur} from "../../../../commun/infrastructure/primaire/autoriserUtilisateur";
import {
    MettreAJourLesInformationsPersonnelles,
    MiseAJourDesInformationsPersonnelles
} from "../../../usecases/MiseAJourDesInformationsPersonnelles";
import {inject} from "typescript-inject";

// @ts-ignore
export const handler = async (event: APIGatewayProxyEvent): Promise<LambdaResult> => {
    // @ts-ignore
    return autoriserUtilisateur(event, async (event: APIGatewayProxyEvent, utilisateur: Utilisateur) => {
        const donnees = JSON.parse(event.body!);
        if (!donnees?.nom?.trim() || !donnees?.prenom?.trim()) {
            return badRequest('Les propriétés nom et prenom sont obligatoires');
        }
        const miseAJourDesInformationsPersonnelles = inject<MiseAJourDesInformationsPersonnelles>('MiseAJourDesInformationsPersonnelles');
        await miseAJourDesInformationsPersonnelles.executer(new MettreAJourLesInformationsPersonnelles(utilisateur.email, donnees.nom, donnees.prenom));
        return ok(true);
    });
}
