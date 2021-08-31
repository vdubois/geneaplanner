import {Badge, Box, Grid, Hidden} from '@material-ui/core';
import React from 'react';

export const Archive = ({
  nom,
  registres,
  entete = false,
}) => (
  <Grid container direction="row" alignItems="center">
    <Grid item container xs={12} sm={12} lg={12} alignItems="center">
      <Grid item xs={12} lg={6}>
        <Box display="flex">{nom}</Box>
      </Grid>
      <Grid item xs={12} lg={6}>
        {registres}
      </Grid>
    </Grid>
    <Hidden xsDown>
      <Grid item sm={2} lg={1}>
        {!entete && registres?.length === 0 && <Badge color="secondary" badgeContent="Nouveau" overlap="circular">
        </Badge>}
      </Grid>
    </Hidden>
  </Grid>
)
