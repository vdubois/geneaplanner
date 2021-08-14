import {CircularProgress} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';

export const RecherchesEnCoursDeChargement = () => {
  return <div className="CorrectionsEnCoursDeChargement">
    <CircularProgress />
    <Typography variant="body1">Chargement des recherches en cours...</Typography>
  </div>
}
