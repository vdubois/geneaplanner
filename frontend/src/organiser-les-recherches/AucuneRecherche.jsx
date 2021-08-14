import Typography from '@material-ui/core/Typography';
import {Button} from '@material-ui/core';
import {Add} from '@material-ui/icons';
import React from 'react';
import './AucuneRecherche.css';

export const AucuneRecherche = ({setFenetreDeSaisieOuverte}) => {
  return <div className="AucuneRecherche">
    <Typography variant="h6" align="center">Aucune recherche actuellement</Typography>
    <Button
      variant="contained"
      color="primary"
      startIcon={<Add/>}
      onClick={() => setFenetreDeSaisieOuverte(true)}
    >Ajouter</Button>
  </div>
}
