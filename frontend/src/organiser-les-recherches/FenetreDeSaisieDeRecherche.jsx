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
} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';
import {Erreur} from '../components/Erreur';
import {priorites} from './priorites';
import {useAjouterRechercheDIndividu} from '../api/recherches.hooks';

export const FenetreDeSaisieDeRecherche = ({ouverte, fermer, individus}) => {
  const [individu, setIndividu] = useState('');
  const [priorite, setPriorite] = useState('');
  const [enCoursDeValidation, setEnCoursDeValidation] = useState(false);
  const [erreur, setErreur] = useState();

  const formulairePasComplet = !individu || !priorite;

  const ajouterRechercheDIndividu = useAjouterRechercheDIndividu();

  const viderLesChamps = () => {
    setIndividu('');
    setPriorite('');
  };

  const ajouterLaRechercheDIndividu = async () => {
    try {
      setEnCoursDeValidation(true);
      await ajouterRechercheDIndividu({
        individu,
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
        Veuillez remplir les champs obligatoires ci-dessous afin de créer la recherche portant sur un individu
      </DialogContentText>
      <Autocomplete
        margin="dense"
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
          id="priorite-label">Priorit&eacute; *</InputLabel>
        <Select
          labelId="priorite-label"
          id="priorite-select"
          onChange={event => setPriorite(event.target.value)}
          variant="outlined"
          value={priorite}
          label="Priorit&eacute; *"
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
        onClick={ajouterLaRechercheDIndividu}
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
