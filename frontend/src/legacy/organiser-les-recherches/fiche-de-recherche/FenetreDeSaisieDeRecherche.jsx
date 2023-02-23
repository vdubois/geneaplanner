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
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import {Erreur} from '../../../components/Erreur';
import {priorites} from '../priorites';
import {useAjouterRechercheDIndividu} from '../../../api/recherches.hooks';

export const FenetreDeSaisieDeRecherche = ({ouverte, fermer, identifiantIndividu}) => {
  const [nom, setNom] = useState('');
  const [lien, setLien] = useState('');
  const [commentaire, setCommentaire] = useState('');
  const [priorite, setPriorite] = useState('');
  const [enCoursDeValidation, setEnCoursDeValidation] = useState(false);
  const [erreur, setErreur] = useState();

  const formulairePasComplet = !nom || !lien || !commentaire;

  const ajouterRecherche = useAjouterRechercheDIndividu(identifiantIndividu);

  const viderLesChamps = () => {
    setNom('');
    setLien('');
    setCommentaire('');
    setPriorite('');
  };

  const ajouterLaRecherche = async () => {
    try {
      setEnCoursDeValidation(true);
      await ajouterRecherche({
        nom,
        lien,
        commentaire,
        priorite,
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
    <DialogTitle id="form-dialog-title">Ajout d'une recherche</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Veuillez remplir les champs obligatoires ci-dessous afin de créer la recherche
      </DialogContentText>
      <FormControl className="ChampFenetreDeSaisie" fullWidth>
        <TextField
          placeholder="Nom *"
          variant="outlined"
          value={nom}
          onChange={event => setNom(event.target.value)}
        />
      </FormControl>
      <FormControl className="ChampFenetreDeSaisie" fullWidth>
        <TextField
          placeholder="Lien *"
          variant="outlined"
          value={lien}
          onChange={event => setLien(event.target.value)}
        />
      </FormControl>
      <FormControl className="ChampFenetreDeSaisie" fullWidth>
        <TextField
          placeholder="Commentaire *"
          multiline
          rows={4}
          variant="outlined"
          value={commentaire}
          onChange={event => setCommentaire(event.target.value)}
        />
      </FormControl>
      <FormControl variant="outlined" className="ChampFenetreDeSaisie" fullWidth>
        <InputLabel
          id="priorite-label">Priorit&eacute; *</InputLabel>
        <Select
          labelId="priorite-label"
          id="priorite-select"
          onChange={event => setPriorite(event.target.value)}
          variant="outlined"
          value={priorite}
          label="Priorit&eacute; *"
        >
          {priorites.map(priorite => (
            <MenuItem
              key={priorite.valeur}
              value={priorite.valeur}>{priorite.libelle}</MenuItem>
          ))}
        </Select>
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
        onClick={ajouterLaRecherche}
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
