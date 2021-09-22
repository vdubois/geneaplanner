import {Box, Grid, IconButton} from '@mui/material';
import React from 'react';
import {Delete} from '@mui/icons-material';
import {useSupprimerRechercheDIndividu} from '../../api/recherches.hooks';

export const LigneRecherche = ({
  entete = false,
  identifiantIndividu,
  identifiantNote,
  nom,
  lien,
  commentaire,
  priorite,
}) => {
  const supprimerRecherche = useSupprimerRechercheDIndividu(identifiantIndividu, identifiantNote);

  return (
    <Grid container direction="row" alignItems="center">
      <Grid item container xs={9} sm={6} lg={6} alignItems="center">
        <Grid item xs={12} lg={6}>
          <Box display="flex">{nom}</Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          {lien}
        </Grid>
      </Grid>
      <Grid item xs={1} sm={4} lg={4}>
        {commentaire}
      </Grid>
      <Grid item xs={1} sm={1} lg={1}>
        {priorite}
      </Grid>
      <Grid item xs={1} sm={1} lg={1} align="right">
        {!entete && <IconButton onClick={() => supprimerRecherche()}><Delete color='primary'/></IconButton>}
      </Grid>
    </Grid>
  )
}
