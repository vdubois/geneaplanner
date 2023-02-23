import React, {useState} from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  TextField
} from '@mui/material';
import {Erreur} from '../../../components/Erreur';
import {useAjouterNoteDIndividu} from '../../../api/recherches.hooks';

export const FenetreDeSaisieDeNote = ({ouverte, fermer, identifiantIndividu}) => {
  const [contenu, setContenu] = useState('');
  const [enCoursDeValidation, setEnCoursDeValidation] = useState(false);
  const [erreur, setErreur] = useState();

  const formulairePasComplet = !contenu;

  const ajouterNote = useAjouterNoteDIndividu(identifiantIndividu);

  const viderLesChamps = () => {
    setContenu('');
  };

  const ajouterLaNote = async () => {
    try {
      setEnCoursDeValidation(true);
      await ajouterNote({
        contenu,
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
    maxWidth="sm">
    <DialogTitle id="form-dialog-title">Ajout d'une note</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Veuillez remplir le champ obligatoire ci-dessous afin de créer la note
      </DialogContentText>
      <FormControl className="ChampFenetreDeSaisie" fullWidth>
        <TextField
          placeholder="Contenu *"
          multiline
          rows={4}
          variant="outlined"
          value={contenu}
          onChange={event => setContenu(event.target.value)}
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
        onClick={ajouterLaNote}
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
