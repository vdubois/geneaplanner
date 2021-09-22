import {Grid, IconButton} from '@mui/material';
import React from 'react';
import {Delete} from '@mui/icons-material';
import {useSupprimerNoteDIndividu} from '../../api/recherches.hooks';

export const LigneNote = ({
  entete = false,
  identifiantIndividu,
  identifiantNote,
  contenu,
}) => {
  const supprimerNote = useSupprimerNoteDIndividu(identifiantIndividu, identifiantNote);

  return (
    <Grid container direction="row" alignItems="center">
      <Grid item xs={11} sm={11} lg={11}>
        {contenu}
      </Grid>
      <Grid item xs={1} sm={1} lg={1} align="right">
        {!entete && <IconButton onClick={() => supprimerNote()}><Delete color='primary'/></IconButton>}
      </Grid>
    </Grid>
  )
}
