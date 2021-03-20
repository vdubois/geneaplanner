import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Container} from "@material-ui/core";
import './ApportDeCorrections.css';
import {CorrectionsEnCoursDeChargement} from "./CorrectionsEnCoursDeChargement";
import {AucuneCorrection} from "./AucuneCorrection";
import {FenetreDeSaisie} from "./FenetreDeSaisie";
import {useCorrections} from "../api/corrections.hooks";
import {useIndividus} from "../api/arbres.hooks";
import {Erreur} from "../components/Erreur";

export const ApportDeCorrections = () => {
    const [fenetreDeSaisieOuverte, setFenetreDeSaisieOuverte] = useState(false);

    const {correctionsEnCoursDeChargement, correctionsEnErreur, corrections} = useCorrections();
    const {individusEnCoursDeChargement, individusEnErreur, individus} = useIndividus();

    return (
        <>
            <Container maxWidth="lg">
                <Typography variant="h4" className="ApportDeCorrectionsTitre">Apporter des corrections</Typography>
                <Paper
                    elevation={3}
                    className="PageApportDeCorrections">
                    {(correctionsEnCoursDeChargement || individusEnCoursDeChargement) && <CorrectionsEnCoursDeChargement/>}
                    {corrections?.length === 0 && <AucuneCorrection setFenetreDeSaisieOuverte={setFenetreDeSaisieOuverte}/>}
                </Paper>
            </Container>
            <FenetreDeSaisie
                ouverte={fenetreDeSaisieOuverte}
                fermer={() => setFenetreDeSaisieOuverte(false)}
                individus={individus}
            />
            {correctionsEnErreur && <Erreur message={correctionsEnErreur} />}
            {individusEnErreur && <Erreur message={individusEnErreur} />}
        </>
    );
}
