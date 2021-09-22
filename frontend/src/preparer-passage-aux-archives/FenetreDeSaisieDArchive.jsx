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
import {Erreur} from '../components/Erreur';
import {useAjouterArchive} from '../api/archives.hooks';

export const FenetreDeSaisieDArchive = ({ouverte, fermer}) => {
  const [libelle, setLibelle] = useState('');
  const [enCoursDeValidation, setEnCoursDeValidation] = useState(false);
  const [erreur, setErreur] = useState();

  const formulairePasComplet = !libelle;

  const ajouterArchive = useAjouterArchive();

  const viderLesChamps = () => {
    setLibelle('');
  };

  const ajouterLArchive = async () => {
    try {
      setEnCoursDeValidation(true);
      await ajouterArchive({
        libelle,
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
    <DialogTitle id="form-dialog-title">Ajout d'un lieu d'archives</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Veuillez remplir le champ obligatoire ci-dessous afin de créer le lieu d'archives
      </DialogContentText>
      <FormControl className="ChampFenetreDeSaisie" fullWidth>
        <TextField
          placeholder="Nom *"
          variant="outlined"
          value={libelle}
          onChange={event => setLibelle(event.target.value)}
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
        onClick={ajouterLArchive}
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
