import React, {useState} from 'react';
import {Button, CircularProgress, Container, Step, StepContent, StepLabel, Stepper, Typography} from "@mui/material";
import './ImportationDeFichierGedcom.css';
import CheckIcon from '@mui/icons-material/Check';
import {usePublierArbre, usePublierRacineDeLArbre} from "../api/arbres.hooks";
import {Erreur} from "../components/Erreur";
import {SelectionRacine} from "./selection-racine/SelectionRacine";

export const ImportationDeFichierGedcom = () => {
    const [etapeActive, setEtapeActive] = useState(0);
    const [erreur, setErreur] = useState();
    const etapeSuivante = () => setEtapeActive(etapePrecedente => etapePrecedente + 1);
    const etapePrecedente = () => setEtapeActive(etapePrecedente => etapePrecedente - 1);
    const [individus, setIndividus] = useState([]);
    const publierArbre = usePublierArbre();
    const publierRacineDeLArbre = usePublierRacineDeLArbre();

    const selectionnerUnFichierGEDCOM = ({target}) => {
        const fichier = target.files[0];
        if (fichier) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(fichier);
            fileReader.onload = async ({target}) => {
                const contenuDuFichier = target.result;
                if (!contenuDuFichier.startsWith('data:application/x-gedcom')) {
                    setErreur(`Le fichier ${fichier.name} n'est pas de type GEDCOM`);
                } else {
                    etapeSuivante();
                    try {
                        const contenuDuFichierGEDCOM =
                            contenuDuFichier.split('data:application/x-gedcom;base64,')[1];
                        const arbre = await publierArbre(contenuDuFichierGEDCOM);
                        setIndividus(arbre.individus);
                        etapeSuivante();
                    } catch (erreur) {
                        setErreur(erreur.message);
                        etapePrecedente();
                    }
                }
            };
        }
    }

    const selectionnerRacineDeLArbre = async (racine) => {
        try {
            const resultat = await publierRacineDeLArbre(racine);
            console.log(resultat);
            etapeSuivante();
        } catch (erreur) {
            setErreur(erreur.message);
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" className="ImportationDeFichierGedcomTitre">Importer un fichier GEDCOM</Typography>
            <Stepper activeStep={etapeActive} orientation="vertical">
                <Step key="step-select-gedcom">
                    <StepLabel>Sélection du fichier GEDCOM</StepLabel>
                    <StepContent>
                        <Typography>Sélectionnez ci-dessous un fichier GEDCOM permettant d'importer votre arbre généalogique dans GénéaPlanner.</Typography>
                        <div className="ImportationDeFichierGedcomActions">
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" color="primary" component="label">
                                    Sélectionner un fichier GEDCOM
                                    <input
                                        accept="*"
                                        className="ImportationDeFichierGedcom"
                                        type="file"
                                        onChange={selectionnerUnFichierGEDCOM}
                                    />
                                </Button>
                            </label>
                        </div>
                    </StepContent>
                </Step>
                <Step key="step-import-gedcom">
                    <StepLabel>Import du fichier GEDCOM</StepLabel>
                    <StepContent>
                        <div className="ImportationDeFichierGedcomAvancement">
                            <CircularProgress />
                            <Typography className="ImportationDeFichierGedcomAvancementTexte">Import du fichier GEDCOM en cours, veuillez patienter...</Typography>
                        </div>
                    </StepContent>
                </Step>
                <Step key="step-selection-racine">
                    <StepLabel>Sélection de la racine de l'arbre</StepLabel>
                    <StepContent>
                        <div className="ImportationDeFichierGedcomChoixRacine">
                            <SelectionRacine
                                individus={individus}
                                racineSelectionnee={(racine) => selectionnerRacineDeLArbre(racine)}
                                afficherBouton={true}
                            />
                        </div>
                    </StepContent>
                </Step>
                <Step key="step-resume-de-l-import">
                    <StepLabel>Import effectué</StepLabel>
                    <StepContent>
                        <div className="ImportationDeFichierGedcomSyntheseConteneur">
                            <div className="ImportationDeFichierGedcomSynthese">
                                <CheckIcon color="primary" />
                                <Typography className="ImportationDeFichierGedcomSyntheseTexte">Fichier GEDCOM importé avec succès, {individus?.length} individus ont été importés</Typography>
                            </div>
                            <div className="ImportationDeFichierGedcomActions">
                                <Button variant="contained" color="primary" component="span">
                                    Voir votre généalogie
                                </Button>
                            </div>
                        </div>
                    </StepContent>
                </Step>
            </Stepper>
            {erreur && <Erreur message={erreur} />}
        </Container>
    );
};
