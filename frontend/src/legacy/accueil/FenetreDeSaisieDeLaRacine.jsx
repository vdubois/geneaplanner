import React, {useState} from 'react';
import {
    Autocomplete,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from '@mui/material';
import {Erreur} from '../../components/Erreur';
import {usePublierRacineDeLArbre} from "../../api/arbres.hooks";
import './FenetreDeSaisieDeLaRacine.css';

export const FenetreDeSaisieDeLaRacine = ({ouverte, fermer, individus}) => {
    const [racine, setRacine] = useState(null);
    const [enCoursDeValidation, setEnCoursDeValidation] = useState(false);
    const [erreur, setErreur] = useState();

    const formulairePasComplet = !racine;

    const publierRacineDeLArbre = usePublierRacineDeLArbre();

    const viderLesChamps = () => {
        setRacine(null);
    };

    const publierRacine = async () => {
        try {
            setEnCoursDeValidation(true);
            await publierRacineDeLArbre(racine);
            viderLesChamps();
            fermer();
        } catch (erreur) {
            setErreur(erreur.message);
        } finally {
            setEnCoursDeValidation(false);
        }
    };

    return <Dialog
        open={ouverte}
        onClose={event => event.preventDefault()}
        maxWidth="sm"
    >
        <DialogTitle id="form-dialog-title">Sélection de la racine de l'arbre</DialogTitle>
        <DialogContent sx={{width: '550px'}}>
            <DialogContentText>
                Votre arbre généalogique est complet, mais nous avons besoin de connaître l'individu racine de l'arbre afin de vous proposer
                une expérience utilisateur optimale. Veuillez le sélectionner ci dessous :
            </DialogContentText>
            <Autocomplete
                margin="dense"
                options={individus}
                getOptionLabel={individu => individu ? `${individu.nom} (${individu.id})` : ''}
                noOptionsText="Aucun individu ne correspond"
                fullWidth
                clearText="Effacer"
                onChange={(event, value) => setRacine(value)}
                renderInput={(params) => <TextField
                    {...params}
                    autoFocus
                    label="Individu racine *"
                    variant="outlined"
                />}
                sx={{width: '500px', marginTop: '16px'}}
            />
        </DialogContent>
        <DialogActions className="SaisieDeLaRacineBoutonsActions">
            <Button
                onClick={publierRacine}
                color="primary"
                variant="contained"
                disabled={formulairePasComplet || enCoursDeValidation}
            >
                {enCoursDeValidation ? <CircularProgress size={24}/> : 'Enregistrer'}
            </Button>
        </DialogActions>
        {erreur && <Erreur message={erreur}/>}
    </Dialog>;
}
