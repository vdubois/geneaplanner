import {
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
} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import React, {useState} from "react";
import './FenetreDeSaisieDeRegistre.css';
import {Erreur} from "../../components/Erreur";
import {useAjouterRegistreAuxArchives} from '../../api/archives.hooks';
import {evenements} from '../evenements';

export const FenetreDeSaisieDeRegistre = ({ouverte, fermer, individus, archives}) => {
    const [individu, setIndividu] = useState('');
    const [evenement, setEvenement] = useState('');
    const [reference, setReference] = useState('');
    const [commentaire, setCommentaire] = useState('');
    const [enCoursDeValidation, setEnCoursDeValidation] = useState(false);
    const [erreur, setErreur] = useState();

    const formulairePasComplet = !individu || !evenement || !reference || !commentaire;

    const ajouterRegistre = useAjouterRegistreAuxArchives(archives);

    const viderLesChamps = () => {
        setIndividu('');
        setEvenement('');
        setReference('');
        setCommentaire('');
    };

    const ajouterLeRegistre = async () => {
        try {
            setEnCoursDeValidation(true);
            await ajouterRegistre({
                individu,
                evenement,
                reference,
                commentaire
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
        <DialogTitle id="form-dialog-title">Ajout d'un registre</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Veuillez remplir les champs obligatoires ci-dessous afin de renseigner le registre à consulter aux archives.
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
                    id="demo-simple-select-label">Ev&eacute;nement *</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={event => setEvenement(event.target.value)}
                    variant="outlined"
                    value={evenement}
                    label="Ev&eacute;nement *"
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
                    {evenements.map(evenement => (
                        <MenuItem
                            key={evenement.identifiant}
                            value={evenement.identifiant}>{evenement.texte}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl className="ChampFenetreDeSaisie" fullWidth>
                <TextField
                    placeholder="Commentaire *"
                    multiline
                    rows={4}
                    rowsMax={4}
                    variant="outlined"
                    value={commentaire}
                    onChange={event => setCommentaire(event.target.value)}
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
                onClick={ajouterLeRegistre}
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
