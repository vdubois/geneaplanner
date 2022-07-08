import {Box, Button} from "@mui/material";
import {Add} from "@mui/icons-material";
import React, {useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {useAdminArchives, useAdminModifierArchive, useAdminSupprimerArchive} from "../../api/archives.admin.hooks";
import {ListeDesArchives} from "./ListeDesArchives";
import {FenetreDeSaisieDArchive} from "./FenetreDeSaisieDArchive";
import {Erreur} from "../../components/Erreur";

export const Archives = ({}) => {
    const [fenetreDeSaisieOuverte, setFenetreDeSaisieOuverte] = useState(false);
    const {isAuthenticated} = useAuth0();
    const {archivesEnCoursDeChargement, archivesEnErreur, archives} = useAdminArchives(isAuthenticated);
    const [archive, setArchive] = useState(null);

    return <>
        <Box display="flex" justifyContent="flex-end">
            <Button
                startIcon={<Add/>}
                variant="contained"
                color="primary"
                onClick={() => {
                    setArchive(null);
                    setFenetreDeSaisieOuverte(true);
                }}>Ajouter</Button>
        </Box>
        <ListeDesArchives
            enCoursDeChargement={archivesEnCoursDeChargement}
            archives={archives}
            setArchive={setArchive}
            setFenetreDeSaisieOuverte={setFenetreDeSaisieOuverte}
        />
        {archive && <FenetreDeSaisieDArchive
            ouverte={fenetreDeSaisieOuverte}
            fermer={() => setFenetreDeSaisieOuverte(false)}
            archive={archive}
        />}
        {archive === null && <FenetreDeSaisieDArchive
            ouverte={fenetreDeSaisieOuverte}
            fermer={() => setFenetreDeSaisieOuverte(false)}
            archive={archive}
        />}
        {archivesEnErreur && <Erreur message={archivesEnErreur.message}/>}
    </>;
}