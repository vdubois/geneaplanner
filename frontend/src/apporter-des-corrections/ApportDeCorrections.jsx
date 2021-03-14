import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
    Button,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";
import './ApportDeCorrections.css';
import {Add} from "@material-ui/icons";
import {callApi} from "../api/api";
import {useAuth0} from "@auth0/auth0-react";

export const ApportDeCorrections = () => {
    const [fenetreDeSaisieOuverte, setFenetreDeSaisieOuverte] = useState(false);
    const fermerFenetreDeSaisie = () => setFenetreDeSaisieOuverte(false);
    const [corrections, setCorrections] = useState();
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
        }
    }, [user]);
    return (
        <>
            <Container maxWidth="lg">
                <Typography variant="h4" className="ApportDeCorrectionsTitre">Apporter des corrections</Typography>
                <Paper elevation={3} style={{width: '100%', height: '82vh'}}>
                    {corrections === undefined && <div className="CorrectionsEnCoursDeChargement">
                        <CircularProgress />
                        <Typography variant="body1">Chargement des corrections en cours...</Typography>
                    </div>}
                    {corrections?.length === 0 && <div className="AucuneCorrection">
                        <Typography variant="body1" className="AucuneCorrectionTexte">Vous n'avez aucune correction en cours</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Add/>}
                            onClick={() => setFenetreDeSaisieOuverte(true)}
                        >Ajouter</Button>
                    </div>}
                </Paper>
            </Container>
            <Dialog
                open={fenetreDeSaisieOuverte}
                onClose={fermerFenetreDeSaisie}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Ajout d'une correction</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={fermerFenetreDeSaisie}
                        color="primary"
                        variant="text"
                    >
                        Annuler
                    </Button>
                    <Button
                        onClick={fermerFenetreDeSaisie}
                        color="primary"
                        variant="contained"
                    >
                        Enregistrer
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
