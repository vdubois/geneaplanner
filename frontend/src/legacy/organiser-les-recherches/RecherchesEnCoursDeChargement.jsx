import {CircularProgress} from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';

export const RecherchesEnCoursDeChargement = () => {
  return <div className="CorrectionsEnCoursDeChargement">
    <CircularProgress />
    <Typography variant="body1">Chargement des recherches en cours...</Typography>
  </div>
}
