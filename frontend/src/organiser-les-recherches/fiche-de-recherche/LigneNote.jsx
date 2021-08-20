import {Grid} from '@material-ui/core';
import React from 'react';

export const LigneNote = ({
  contenu,
}) => (
  <Grid container direction="row" alignItems="center">
    <Grid item xs={12} sm={12} lg={12}>
      {contenu}
    </Grid>
  </Grid>
)
