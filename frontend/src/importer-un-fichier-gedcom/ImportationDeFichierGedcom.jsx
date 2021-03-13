import {Button, CircularProgress, Snackbar, Step, StepContent, StepLabel, Stepper, Typography} from "@material-ui/core";
import './ImportationDeFichierGedcom.css';
import {useState} from "react";
import CheckIcon from '@material-ui/icons/Check';
import {Alert} from "@material-ui/lab";
import {useAuth0} from "@auth0/auth0-react";
import {callApi} from '../api/api';

export const ImportationDeFichierGedcom = () => {
    const { user } = useAuth0();
    const [etapeActive, setEtapeActive] = useState(0);
    const [erreur, setErreur] = useState();
    const [erreurAffichee, setErreurAffichee] = useState(false);
    const etapeSuivante = () => setEtapeActive(etapePrecedente => etapePrecedente + 1);
    const etapePrecedente = () => setEtapeActive(etapePrecedente => etapePrecedente - 1);
    const [individus, setIndividus] = useState();
    const selectionnerUnFichierGEDCOM = ({target}) => {
        const fichier = target.files[0];
        console.log(fichier);
        if (fichier) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(fichier);
            fileReader.onload = async ({target}) => {
                const contenuDuFichier = target.result;
                console.log(contenuDuFichier);
                if (!contenuDuFichier.startsWith('data:application/x-gedcom')) {
                    setErreur(`Le fichier ${fichier.name} n'est pas de type GEDCOM`);
                    setErreurAffichee(true);
                    setTimeout(() => setErreurAffichee(false), 6000);
                } else {
                    etapeSuivante();
                    try {
                        const arbre = await callApi({
                            endpoint: `/utilisateurs/${user.email}/arbre`,
                            method: 'PUT',
                            body: contenuDuFichier.split('data:application/x-gedcom;base64,')[1]
                        });
                        setIndividus(arbre.individus);
                        etapeSuivante();
                    } catch (erreur) {
                        setErreur(erreur.message);
                        setErreurAffichee(true);
                        setTimeout(() => setErreurAffichee(false), 6000);
                        etapePrecedente();
                    }
                }
            };
        }
    }
    return (
        <div className="ImportationDeFichierGedcom">
            <div className="ImportationDeFichierGedcomContenu">
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
                    <Step key="step-resume-de-l-import">
                        <StepLabel>Import effectué</StepLabel>
                        <StepContent>
                            <div className="ImportationDeFichierGedcomSyntheseConteneur">
                                <div className="ImportationDeFichierGedcomSynthese">
                                    <CheckIcon color="primary" />
                                    <Typography className="ImportationDeFichierGedcomSyntheseTexte">Fichier GEDCOM importé avec succès, {individus} individus ont été importés</Typography>
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
                {erreurAffichee && <Snackbar open={erreurAffichee}>
                    <Alert
                        severity="error"
                        onClose={() => setErreurAffichee(false)}
                        variant="filled"
                    >
                        {erreur}
                    </Alert>
                </Snackbar>}
            </div>
        </div>
    );
};
