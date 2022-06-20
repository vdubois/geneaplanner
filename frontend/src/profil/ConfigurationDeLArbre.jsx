import Typography from "@mui/material/Typography";
import {Box, Button} from "@mui/material";
import {dateAsString} from "../dates";
import {ConfirmerLaSuppressionDeLArbre} from "./ConfirmerLaSuppressionDeLArbre";
import React, {useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {useIndividus, useSupprimerLArbre} from "../api/arbres.hooks";
import {useNavigate} from "react-router-dom";

export const ConfigurationDeLArbre = () => {
    const {isAuthenticated, user} = useAuth0();
    const {arbre} = useIndividus(isAuthenticated);
    const supprimerLArbre = useSupprimerLArbre();
    const navigateTo = useNavigate();
    const [fenetreDeConfirmationDeSuppressionOuverte, setFenetreDeConfirmationDeSuppressionOuverte] = useState(false);

    return <>
        {user?.name && <Typography variant="h4" className="ProfilTitre">Profil de {user.name}</Typography>}
        {arbre && arbre?.individus?.length > 0 && <Box id="formulaire" display="flex" flexDirection="column">
            <Box display="flex" alignItems="center" gap="10px">
                <span>Votre arbre généalogique : {arbre.individus.length} individus, dernière mise à jour le {dateAsString(arbre.date)}</span>
                <Button variant="contained" color="primary" onClick={() => setFenetreDeConfirmationDeSuppressionOuverte(true)}>Supprimer</Button>
            </Box>
        </Box>}
        {arbre && arbre?.individus?.length === 0 && <Box id="formulaire" display="flex">
            <Button variant="contained" color="primary" onClick={() => navigateTo('/importer-un-fichier-gedcom')}>Importer votre arbre au format GEDCOM</Button>
        </Box>}
        <ConfirmerLaSuppressionDeLArbre
            open={fenetreDeConfirmationDeSuppressionOuverte}
            handleCancel={() => setFenetreDeConfirmationDeSuppressionOuverte(false)}
            handleConfirm={() => {
                supprimerLArbre();
                setFenetreDeConfirmationDeSuppressionOuverte(false)
            }}/>
    </>
}