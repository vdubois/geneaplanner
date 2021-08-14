import {Box, Grid} from '@material-ui/core';
import React from 'react';

export const Recherche = ({
  nomDeLIndividu,
  priorite,
  nombreDeRecherches,
  nombreDeNotes
}) => (
  <Grid container direction="row" alignItems="center">
    <Grid item container xs={10} sm={8} lg={6} alignItems="center">
      <Grid item xs={12} lg={6}>
        <Box display="flex">{nomDeLIndividu}</Box>
      </Grid>
      <Grid item xs={12} lg={6}>
        {priorite}
      </Grid>
    </Grid>
    <Grid item xs={1} sm={2} lg={3}>
      {nombreDeRecherches}
    </Grid>
    <Grid item xs={1} sm={2} lg={3}>
      {nombreDeNotes}
    </Grid>
  </Grid>
)
