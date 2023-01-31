import {APIGatewayProxyEvent} from "aws-lambda";
import {LambdaResult, ok} from "aws-lambda-utils";
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
        try {
            const donnees = JSON.parse(event.body!);
            const miseAJourDesInformationsPersonnelles = inject<MiseAJourDesInformationsPersonnelles>('MiseAJourDesInformationsPersonnelles');
            await miseAJourDesInformationsPersonnelles.executer(new MettreAJourLesInformationsPersonnelles(utilisateur.email, donnees.nom, donnees.prenom));
            return ok(true);
        } catch (erreur) {
            console.error(erreur);
            return ok(false);
        }
    });
}
