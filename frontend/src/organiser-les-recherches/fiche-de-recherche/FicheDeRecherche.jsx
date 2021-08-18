import {useParams} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import {Box, Container} from '@material-ui/core';
import {useIndividu} from '../../api/arbres.hooks';
import {Skeleton} from '@material-ui/lab';
import {LigneDeVie} from './LigneDeVie';

export const FicheDeRecherche = () => {
  let {individu: identifiantIndividu} = useParams();
  let {individuEnCoursDeChargement, individuEnErreur, individu} = useIndividu(identifiantIndividu);

  return <Container maxWidth="lg">
    <Typography variant="h4" className="OrganisationDesRecherchesTitre">
      {individuEnCoursDeChargement ? <Skeleton variant="text" /> : "Recherches - " + individu?.nom}
    </Typography>
    <Box display="flex">
      {individuEnCoursDeChargement? <Skeleton variant="rect" /> : <LigneDeVie individu={individu} />}
    </Box>
  </Container>;
}
