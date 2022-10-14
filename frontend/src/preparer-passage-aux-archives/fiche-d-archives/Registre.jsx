import {Badge, Box, Grid, Hidden} from '@mui/material';
import React from 'react';

export const Registre = ({
                              individu,
                              reference,
                              commentaires,
                              actions,
                              entete = false,
                              nouveau = false
                          }) => (
    <Grid container direction="row" alignItems="center">
        <Grid item xs={12} lg={5}>
            <Box display="flex">{individu}</Box>
        </Grid>
        <Grid item xs={1} sm={2} lg={2}>
            {reference}
        </Grid>
        <Grid item xs={1} sm={2} lg={4}>
            {commentaires}
        </Grid>
        <Grid item xs={1} sm={2} lg={1}>
            {actions}
        </Grid>
    </Grid>
)
