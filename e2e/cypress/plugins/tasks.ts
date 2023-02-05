import Tasks = Cypress.Tasks;
import {creerUnUtilisateur} from "./tasks/creerUnUtilisateur";
import {supprimerUnUtilisateur} from "./tasks/supprimerUnUtilisateur";

export const tasks: Tasks = {
    creerUnUtilisateur,
    supprimerUnUtilisateur
}
