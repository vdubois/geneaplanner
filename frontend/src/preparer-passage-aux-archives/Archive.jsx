import {Badge, Box, Grid, Hidden, IconButton} from '@mui/material';
import React from 'react';
import {Language, ScreenSearchDesktop} from "@mui/icons-material";

export const Archive = ({
  nom,
  siteInternet,
  siteInternetEtatCivil,
  adresse,
  horaires,
  registres,
  entete = false,
}) => (
  <Grid container direction="row" alignItems="center">
    <Grid item container xs={12} sm={12} lg={12} alignItems="center">
      <Grid item xs={12} lg={6}>
        <Box display="flex" gap="6px" alignItems="center">
            {nom}
            {(siteInternet || siteInternetEtatCivil) && <Box display="flex" alignItems="center">
                {siteInternet && <IconButton onClick={(event) => {
                    window.open(siteInternet, '_blank');
                    event.stopPropagation();
                }}>
                    <Language/>
                </IconButton>}
                {siteInternetEtatCivil && <IconButton onClick={(event) => {
                    window.open(siteInternetEtatCivil, '_blank');
                    event.stopPropagation();
                }}>
                    <ScreenSearchDesktop/>
                </IconButton>}
            </Box>}
        </Box>
      </Grid>
      <Grid item xs={12} lg={6}>
        {registres}
      </Grid>
    </Grid>
      <Grid item container xs={12} lg={12} alignItems="center">
          <Grid item xs={3} lg={3}>
              {typeof adresse === 'string' && <><span style={{fontWeight: 'bold'}}>Adresse :</span><br/><span dangerouslySetInnerHTML={{__html: adresse?.replaceAll('\n', '<br/>')}}></span></>}
              {typeof adresse !== 'string' && adresse}
          </Grid>
          <Grid item xs={6} lg={6}>
              {typeof horaires === 'string' && <><span style={{fontWeight: 'bold'}}>Horaires :</span><br/><span dangerouslySetInnerHTML={{__html: horaires?.replaceAll('\n', '<br/>')}}></span></>}
              {typeof horaires !== 'string' && horaires}
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
