import React, {useEffect, useState} from 'react';
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
import {Erreur} from '../../components/Erreur';
import {useAdminAjouterArchive, useAdminModifierArchive} from "../../api/archives.admin.hooks";

export const FenetreDeSaisieDArchive = ({ouverte, fermer, archive}) => {
  const [libelle, setLibelle] = useState('');
  const [siteInternet, setSiteInternet] = useState('');
  const [siteInternetEtatCivil, setSiteInternetEtatCivil] = useState('');
  const [adresse, setAdresse] = useState('');
  const [horaires, setHoraires] = useState('');
  const [enCoursDeValidation, setEnCoursDeValidation] = useState(false);
  const [erreur, setErreur] = useState();

  const formulairePasComplet = !libelle;

  const ajouterArchive = useAdminAjouterArchive();

  let modifierArchive = useAdminModifierArchive(archive?.id);

  useEffect(() => {
    if (archive && !libelle) {
      setLibelle(archive.libelle);
      setSiteInternet(archive.siteInternet);
      setSiteInternetEtatCivil(archive.siteInternetEtatCivil);
      setAdresse(archive.adresse);
      setHoraires(archive.horaires);
    } else if (!archive && libelle) {
      setLibelle('');
      setSiteInternet('');
      setSiteInternetEtatCivil('');
      setAdresse('');
      setHoraires('');
    }
  }, [archive]);

  const viderLesChamps = () => {
    setLibelle('');
    setSiteInternet('');
    setSiteInternetEtatCivil('');
    setAdresse('');
    setHoraires('');
  };

  const enregistrerLArchive = async () => {
    try {
      setEnCoursDeValidation(true);
      if (archive) {
        await modifierArchive({
          libelle,
          siteInternet,
          siteInternetEtatCivil,
          adresse,
          horaires
        });
      } else {
        await ajouterArchive({
          libelle,
          siteInternet,
          siteInternetEtatCivil,
          adresse,
          horaires
        });
      }
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
    <DialogTitle id="form-dialog-title">{archive ? 'Modification' : 'Ajout'} d'un lieu d'archives</DialogTitle>
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
      <FormControl className="ChampFenetreDeSaisie" fullWidth>
        <TextField
          placeholder="Site internet"
          variant="outlined"
          value={siteInternet}
          onChange={event => setSiteInternet(event.target.value)}
        />
      </FormControl>
      <FormControl className="ChampFenetreDeSaisie" fullWidth>
        <TextField
          placeholder="Site internet, rubrique recherches d'état civil"
          variant="outlined"
          value={siteInternetEtatCivil}
          onChange={event => setSiteInternetEtatCivil(event.target.value)}
        />
      </FormControl>
      <FormControl className="ChampFenetreDeSaisie" fullWidth>
        <TextField
          placeholder="Adresse"
          multiline
          rows={4}
          variant="outlined"
          value={adresse}
          onChange={event => setAdresse(event.target.value)}
        />
      </FormControl>
      <FormControl className="ChampFenetreDeSaisie" fullWidth>
        <TextField
          placeholder="Horaires"
          multiline
          rows={4}
          variant="outlined"
          value={horaires}
          onChange={event => setHoraires(event.target.value)}
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
        onClick={enregistrerLArchive}
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
