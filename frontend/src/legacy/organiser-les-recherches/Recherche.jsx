import {Badge, Box, Grid, Hidden} from '@mui/material';
import React from 'react';

export const Recherche = ({
  nomDeLIndividu,
  priorite,
  nombreDeRecherches,
  nombreDeNotes,
  entete = false,
  nouveau = false
}) => (
  <Grid container direction="row" alignItems="center">
    <Grid item container xs={10} sm={6} lg={6} alignItems="center">
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
    <Grid item xs={1} sm={2} lg={2}>
      {nombreDeNotes}
    </Grid>
    <Hidden xsDown>
      <Grid item sm={2} lg={1}>
        {!entete && nouveau && <Badge color="secondary" badgeContent="Nouveau" overlap="circular">
        </Badge>}
      </Grid>
    </Hidden>
  </Grid>
)
