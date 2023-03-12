import {RenseignerLesInformationsPersonnelles} from "./RenseignerLesInformationsPersonnelles";
import {ImporterUnFichierGedcom} from "./ImporterUnFichierGedcom";
import useStep from "../hooks/useStep";

export const PremiereConnexion = () => {
    const [etape, {goToNextStep: avancer}] = useStep(3);

    return <>
        {etape === 1 && <RenseignerLesInformationsPersonnelles valider={avancer}/>}
        {etape === 2 && <ImporterUnFichierGedcom />}
    </>
}
