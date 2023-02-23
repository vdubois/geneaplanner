import {Badge, Box, Grid, Hidden} from '@mui/material';
import React from 'react';

export const Archive = ({
  nom,
  actions,
  entete = false,
}) => (
  <Grid container direction="row" alignItems="center">
    <Grid item container xs={12} sm={12} lg={12} alignItems="center">
      <Grid item xs={12} lg={10}>
        <Box display="flex">{nom}</Box>
      </Grid>
      <Grid item xs={12} lg={2}>
        {actions}
      </Grid>
    </Grid>
  </Grid>
)
