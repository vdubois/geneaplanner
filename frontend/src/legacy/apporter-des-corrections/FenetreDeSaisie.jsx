import {
    Autocomplete,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import React, {useState} from "react";
import './FenetreDeSaisie.css';
import {useAjouterCorrection} from "../../api/corrections.hooks";
import {raisons} from "./raisons";
import {Erreur} from "../../components/Erreur";

export const FenetreDeSaisie = ({ouverte, fermer, individus}) => {
    const [individu, setIndividu] = useState('');
    const [raison, setRaison] = useState('');
    const [description, setDescription] = useState('');
    const [enCoursDeValidation, setEnCoursDeValidation] = useState(false);
    const [erreur, setErreur] = useState();

    const formulairePasComplet = !individu || !raison || !description;

    const ajouterCorrection = useAjouterCorrection();

    const viderLesChamps = () => {
        setIndividu('');
        setRaison('');
        setDescription('');
    };

    const ajouterLaCorrection = async () => {
        try {
            setEnCoursDeValidation(true);
            await ajouterCorrection({
                individu,
                raison,
                description
            });
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
        onClose={fermer}
        maxWidth="sm"
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ajout d'une correction</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Veuillez remplir les champs obligatoires ci-dessous afin de renseigner la correction à apporter à
                l'arbre généalogique.
            </DialogContentText>
            <Autocomplete
              disablePortal
                margin="dense"
                id="combo-box-demo"
                options={individus}
                getOptionLabel={individu => individu ? `${individu.nom} (${individu.id})` : ''}
                noOptionsText="Aucun individu ne correspond"
                fullWidth
                clearText="Effacer"
                onChange={(event, value) => setIndividu(value)}
                renderInput={(params) => <TextField
                    {...params}
                    autoFocus
                    label="Individu concerné *"
                    variant="outlined"
                />}
            />
            <FormControl variant="outlined" className="ChampFenetreDeSaisie" fullWidth>
                <InputLabel
                    id="demo-simple-select-label">Raison *</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={event => setRaison(event.target.value)}
                    variant="outlined"
                    value={raison}
                    label="Raison *"
                >
                    {raisons.map(raison => (
                        <MenuItem
                            key={raison.identifiant}
                            value={raison.identifiant}>{raison.texte}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl className="ChampFenetreDeSaisie" fullWidth>
                <TextField
                    placeholder="Description *"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                />
            </FormControl>
        </DialogContent>
        <DialogActions className="FenetreDeSaisieBoutonsActions">
            <Button
                onClick={() => {
                    viderLesChamps();
                    fermer();
                }}
                color="primary"
                variant="text"
            >
                Annuler
            </Button>
            <Button
                onClick={ajouterLaCorrection}
                color="primary"
                variant="contained"
                disabled={formulairePasComplet || enCoursDeValidation}
            >
                {enCoursDeValidation ? <CircularProgress size={24} /> : 'Enregistrer'}
            </Button>
        </DialogActions>
        {erreur && <Erreur message={erreur} />}
    </Dialog>;
};
