import {Box, Grid} from '@material-ui/core';
import React from 'react';

export const LigneRecherche = ({
  nom,
  lien,
  commentaire,
  priorite,
}) => (
  <Grid container direction="row" alignItems="center">
    <Grid item container xs={10} sm={6} lg={6} alignItems="center">
      <Grid item xs={12} lg={6}>
        <Box display="flex">{nom}</Box>
      </Grid>
      <Grid item xs={12} lg={6}>
        {lien}
      </Grid>
    </Grid>
    <Grid item xs={1} sm={5} lg={4}>
      {commentaire}
    </Grid>
    <Grid item xs={1} sm={1} lg={2}>
      {priorite}
    </Grid>
  </Grid>
)
