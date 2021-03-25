import {
    Button,
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
} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import React, {useState} from "react";
import './FenetreDeSaisie.css';
import {useAjouterCorrection} from "../api/corrections.hooks";
import {raisons} from "./raisons";

export const FenetreDeSaisie = ({ouverte, fermer, individus}) => {
    const [individu, setIndividu] = useState('');
    const [raison, setRaison] = useState('');
    const [description, setDescription] = useState('');

    const formulairePasComplet = !individu || !raison || !description;

    const ajouterCorrection = useAjouterCorrection();

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
                margin="dense"
                id="combo-box-demo"
                options={individus}
                getOptionLabel={individu => individu ? individu.nom : ''}
                getOptionSelected={(option, value) => option.id === value.id}
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
                    MenuProps={
                        {
                            getContentAnchorEl: null,
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                            }
                        }
                    }
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
                    rowsMax={4}
                    variant="outlined"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                />
            </FormControl>
        </DialogContent>
        <DialogActions className="FenetreDeSaisieBoutonsActions">
            <Button
                onClick={fermer}
                color="primary"
                variant="text"
            >
                Annuler
            </Button>
            <Button
                onClick={async () => {
                    await ajouterCorrection({
                        individu,
                        raison,
                        description
                    });
                    fermer();
                }}
                color="primary"
                variant="contained"
                disabled={formulairePasComplet}
            >
                Enregistrer
            </Button>
        </DialogActions>
    </Dialog>;
};
