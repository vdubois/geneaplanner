import React, {useEffect, useState} from "react";
import {Box, CircularProgress} from "@mui/material";
import {Erreur} from "../../components/Erreur";
import {usePublierFichiersArbre} from "../../api/arbres.hooks";

export const ConfigurationGitlabEtape3 = ({host, token, project}) => {
    const [files, setFiles] = useState([]);
    const [enCoursDeChargement, setEnCoursDeChargement] = useState(false);
    const [enErreur, setEnErreur] = useState();
    const publierFichiersArbre = usePublierFichiersArbre();

    useEffect(() => {
        const fetchFiles = async () => {
            const fichiers = [];
            const response = await fetch(
                `${host}/api/v4/projects/${project}/repository/tree?recursive=true&pagination=keyset&per_page=50`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            if (!response.ok) {
                throw new Error(await response.json());
            }
            const fichiersPagines = await response.json();
            fichiers.push(...fichiersPagines);
            let link = response.headers.get("Link");
            let liens = link.split(' ');
            let indexSuivant = liens.findIndex(el => el.includes("rel=\"next\"")) - 1;
            while (indexSuivant >= 0) {
                let lienSuivant = liens[indexSuivant];
                const lienDeLaPageSuivante = lienSuivant
                    .replaceAll("<", "")
                    .replaceAll(">", "");
                const responsePageSuivante = await fetch(
                    lienDeLaPageSuivante,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                if (!responsePageSuivante.ok) {
                    throw new Error(await responsePageSuivante.json());
                }
                const fichiersPagines = await responsePageSuivante.json();
                fichiers.push(...fichiersPagines);
                link = responsePageSuivante.headers.get("Link");
                liens = link.split(' ');
                indexSuivant = liens.findIndex(el => el.includes("rel=\"next\"")) - 1;
            }
            return fichiers;
        };
        setEnCoursDeChargement(true);
        fetchFiles()
            .then(async (filesResultat) => {
                await publierFichiersArbre(filesResultat.filter(file => file.type === 'blob'));
                setFiles(filesResultat);
            })
            .catch(erreur => setEnErreur(erreur))
            .finally(() => setEnCoursDeChargement(false));
    }, []);
    return <Box display="flex" gap="10px" alignItems="center" sx={{width: '100%', marginBottom: '2rem'}}>
        {enCoursDeChargement &&
            <>
                <CircularProgress/>
                <span>Recherche des fichiers en cours...</span>
            </>
        }
        {!enCoursDeChargement && files && files.length > 0 && <Box display="flex" flexDirection="column">
            <span>{files.filter(file => file.type === 'blob').length} fichier(s) trouv&eacute;s</span>
        </Box>}
        {enErreur && <Erreur message={enErreur.message}/>}
    </Box>;
}