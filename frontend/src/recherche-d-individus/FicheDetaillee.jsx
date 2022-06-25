import {Box} from "@mui/material";
import {useIndividu} from "../api/arbres.hooks";
import {LigneDeVie} from "../organiser-les-recherches/fiche-de-recherche/LigneDeVie";

export const FicheDetaillee = ({identifiantIndividu}) => {
    let {individuEnCoursDeChargement, individuEnErreur, individu} = useIndividu(identifiantIndividu);

    return <Box display="flex" flexDirection="column" sx={{width: '100%'}}>
        {individu && <LigneDeVie individu={individu} />}
    </Box>;
}