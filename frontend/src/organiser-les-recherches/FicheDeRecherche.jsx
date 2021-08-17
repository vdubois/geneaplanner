import {useParams} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import {Container} from '@material-ui/core';

export const FicheDeRecherche = () => {
  let {individu} = useParams();

  return <Container maxWidth="lg">
    <Typography variant="h4" className="OrganisationDesRecherchesTitre">Recherches - {individu}</Typography>
  </Container>;
}
