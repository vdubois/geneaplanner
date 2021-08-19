import {useParams} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import {Box, Container} from '@material-ui/core';
import {useIndividu} from '../../api/arbres.hooks';
import {Skeleton} from '@material-ui/lab';
import {LigneDeVie} from './LigneDeVie';
import {RetourALaListeDesRecherches} from './RetourALaListeDesRecherches';

export const FicheDeRecherche = () => {
  let {individu: identifiantIndividu} = useParams();
  let {individuEnCoursDeChargement, individuEnErreur, individu} = useIndividu(identifiantIndividu.replace(/@/g, ''));

  return <Container maxWidth="lg">
    <Typography variant="h4" className="OrganisationDesRecherchesTitre">
      {individuEnCoursDeChargement ? <Skeleton variant="rect" width="50%" /> : "Recherches - " + individu?.nom}
    </Typography>
    <RetourALaListeDesRecherches/>
    <Box display="flex" justifyContent="center">
      {individuEnCoursDeChargement? <Skeleton variant="rect" width="90%" height="300px"/> : <LigneDeVie individu={individu} />}
    </Box>
  </Container>;
}
