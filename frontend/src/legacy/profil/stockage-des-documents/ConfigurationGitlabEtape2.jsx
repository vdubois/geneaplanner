import {CircularProgress, FormControl, FormGroup, FormHelperText, InputLabel, MenuItem, Select} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Erreur} from "../../../components/Erreur";

export const ConfigurationGitlabEtape2 = ({host, token, project, setProject}) => {
    const [depots, setDepots] = useState([]);
    const [depotsEnCoursDeChargement, setDepotsEnCoursDeChargement] = useState(false);
    const [depotsEnErreur, setDepotsEnErreur] = useState();

    useEffect(() => {
        setDepotsEnCoursDeChargement(true);
        const fetchDepots = async () => {
            const response = await fetch(
                `${host}/api/v4/projects?owned=true`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            if (!response.ok) {
                throw new Error(response.json());
            }
            return response.json();
        };
        fetchDepots()
            .then(reponse => setDepots(reponse))
            .catch(erreur => setDepotsEnErreur(erreur))
            .finally(() => setDepotsEnCoursDeChargement(false));
    }, []);

    return <>
        <FormGroup
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                marginBottom: '20px',
                alignItems: 'center',
                width: '100%'
            }}>
            {depotsEnCoursDeChargement && <CircularProgress/>}
            {depots && depots?.length > 0 && <FormControl variant="outlined" size="medium">
                <InputLabel id="gitlab-project-select-label">Projet</InputLabel>
                <Select
                    labelId="gitlab-project-select-label"
                    id="gitlab-project-select"
                    value={project}
                    label="Projet"
                    fullWidth
                    sx={{width: '100%'}}
                    onChange={(event) => setProject(event.target.value)}
                >
                    {depots.map(projet => (<MenuItem
                        key={projet.id}
                        value={projet.id}
                    >{projet.name}</MenuItem>))}
                </Select>
                <FormHelperText>Choix du projet contenant les m&eacute;dias de votre généalogie</FormHelperText>
            </FormControl>}
            {!depotsEnCoursDeChargement && depots && depots?.length === 0 && <span>Aucun projet Gitlab trouv&eacute;</span>}
        </FormGroup>
        {depotsEnErreur && <Erreur message={depotsEnErreur.message}/>}
    </>;
}
