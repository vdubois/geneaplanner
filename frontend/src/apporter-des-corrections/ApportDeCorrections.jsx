import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Container} from "@material-ui/core";
import './ApportDeCorrections.css';
import {callApi} from "../api/api";
import {useAuth0} from "@auth0/auth0-react";
import {CorrectionsEnCoursDeChargement} from "./CorrectionsEnCoursDeChargement";
import {AucuneCorrection} from "./AucuneCorrection";
import {FenetreDeSaisie} from "./FenetreDeSaisie";

export const ApportDeCorrections = () => {
    const [fenetreDeSaisieOuverte, setFenetreDeSaisieOuverte] = useState(false);
    const fermerFenetreDeSaisie = () => setFenetreDeSaisieOuverte(false);
    const [corrections, setCorrections] = useState();
    const [individusDeLArbre, setIndividusDeLArbre] = useState();
    const { user } = useAuth0();
    useEffect(() => {
        if (user) {
            const recupererCorrections = async () => {
                const correctionsDeLUtilisateur = await callApi({
                    method: 'GET',
                    endpoint: `/utilisateurs/${user.email}/corrections`
                });
                setCorrections(correctionsDeLUtilisateur);
            };
            recupererCorrections();
            const recupererIndividusDeLArbre = async () => {
                const individusDeLArbreDeLUtilisateur = await callApi({
                    method: 'GET',
                    endpoint: `/utilisateurs/${user.email}/arbre`
                });
                setIndividusDeLArbre(individusDeLArbreDeLUtilisateur);
            }
            recupererIndividusDeLArbre();
        }
    }, [user]);
    return (
        <>
            <Container maxWidth="lg">
                <Typography variant="h4" className="ApportDeCorrectionsTitre">Apporter des corrections</Typography>
                <Paper
                    elevation={3}
                    className="PageApportDeCorrections">
                    {corrections === undefined && <CorrectionsEnCoursDeChargement/>}
                    {corrections?.length === 0 && <AucuneCorrection setFenetreDeSaisieOuverte={setFenetreDeSaisieOuverte}/>}
                </Paper>
            </Container>
            <FenetreDeSaisie
                ouverte={fenetreDeSaisieOuverte}
                fermer={fermerFenetreDeSaisie}
                individus={individusDeLArbre}
            />
        </>
    );
}
