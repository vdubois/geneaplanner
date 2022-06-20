import {Box, Button, FormControl, FormGroup, InputLabel, Step, StepLabel, Stepper} from "@mui/material";
import React, {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {useConnexionFichiers, useModifierParametrageFichiers, useParametrageFichiers} from "../api/fichiers.hooks";
import {Erreur} from "../components/Erreur";
import {ConfigurationGitlabEtape1} from "./ConfigurationGitlabEtape1";
import {ConfigurationGitlabEtape2} from "./ConfigurationGitlabEtape2";
import {useQueryClient} from "react-query";
import {ConfigurationGitlabEtape3} from "./ConfigurationGitlabEtape3";

export const ConfigurationGitlab = () => {
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Compte Gitlab', 'Choix du projet', 'Test de la connexion'];
    const connexionFichiers = useConnexionFichiers();
    const modifierParametrageFichiers = useModifierParametrageFichiers();
    const {
        parametrageFichiersEnCoursDeChargement,
        parametrageFichiersEnErreur,
        parametrageFichiers
    } = useParametrageFichiers();
    const queryClient = useQueryClient();

    const [host, setHost] = useState('');
    const [token, setToken] = useState('');
    const [project, setProject] = useState('');
    const [erreur, setErreur] = useState();

    useEffect(() => {
        if (parametrageFichiers) {
            setHost(parametrageFichiers.host);
            setToken(parametrageFichiers.token);
        }
    }, [parametrageFichiers]);

    useEffect(() => {
        if (activeStep === 0) {
            queryClient.invalidateQueries('fichiers');
        }
    }, [activeStep]);

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleNext = async () => {
        if (activeStep === 0) {
            try {
                const connecte = await connexionFichiers({
                    host,
                    token
                });
                if (connecte) {
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                } else {
                    setErreur("Paramètres de connexion invalides");
                }
            } catch (erreur) {
                setErreur("Paramètres de connexion invalides");
            }
        }
        if (activeStep === 1) {
            try {
                const projetEnregistre = await modifierParametrageFichiers({
                    project
                });
                if (projetEnregistre) {
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                } else {
                    setErreur("Enregistrement du projet impossible");
                }
            } catch (erreur) {
                setErreur("Enregistrement du projet impossible");
            }
        }
    };

    const formulaireValide = () => {
        if (activeStep === 0) {
            return host
                && host.trim() !== ''
                && (host.startsWith("http://") || host.startsWith("https://"))
                && token
                && token.trim() !== '';
        }
        if (activeStep === 1) {
            return project;
        }
        return false;
    }

    return <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
                return (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                );
            })}
        </Stepper>
        {activeStep === steps.length ? (
            <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Reset</Button>
                </Box>
            </React.Fragment>
        ) : (
            <>
                <Typography sx={{ mt: 2, mb: 1 }}>&Eacute;tape {activeStep + 1}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', pt: 2 }}>
                    {activeStep === 0 && <ConfigurationGitlabEtape1
                        enCoursDeChargement={parametrageFichiersEnCoursDeChargement}
                        host={host}
                        setHost={setHost}
                        token={token}
                        setToken={setToken}
                    />}
                    {activeStep === 1 && <ConfigurationGitlabEtape2
                        host={host}
                        token={token}
                        project={project}
                        setProject={setProject}
                    />}
                    {activeStep === 2 && <ConfigurationGitlabEtape3
                        host={host}
                        token={token}
                        project={project}
                    />}
                    <Box display="flex">
                        <Button
                            color="inherit"
                            variant="contained"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Retour
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button variant="contained" onClick={handleNext} disabled={!formulaireValide()}>
                            {activeStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
                        </Button>
                    </Box>
                </Box>
            </>
        )}
        {erreur && <Erreur message={erreur} />}
    </Box>
}