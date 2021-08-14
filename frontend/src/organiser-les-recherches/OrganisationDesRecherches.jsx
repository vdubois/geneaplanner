import Typography from '@material-ui/core/Typography';
import React, {useState} from 'react';
import './OrganisationDesRecherches.css';
import {Box, Container} from '@material-ui/core';
import {useRecherches} from '../api/recherches.hooks';
import {RecherchesEnCoursDeChargement} from './RecherchesEnCoursDeChargement';
import {Alert} from '@material-ui/lab';
import {AucuneRecherche} from './AucuneRecherche';
import {Recherche} from '../components/Recherche';

export const OrganisationDesRecherches = () => {
  const {recherchesEnCoursDeChargement, recherchesEnErreur, recherches} = useRecherches();
  const [fenetreDeSaisieOuverte, setFenetreDeSaisieOuverte] = useState(false);

  const contenu = () => {
    if (recherchesEnCoursDeChargement) {
      return <RecherchesEnCoursDeChargement />
    }
    if (recherchesEnErreur) {
      return <Box py={2}>
        <Alert severity="error">
          Une erreur s'est produite
        </Alert>
      </Box>
    }
    const individus = Object.keys(recherches);
    if (individus.length === 0) {
      return <AucuneRecherche />
    }
    return individus.map(individu => <Recherche
      nomDeLIndividu={recherches[individu].nomDeLIndividu}
      priorite={recherches[individu].priorite}
      nombreDeRecherches={recherches[individu].recherches?.length}
      nombreDeNotes={recherches[individu].notes?.length}
    />)
  }

  return <div className="OrganisationDesRecherches">
    <Container maxWidth="md">
      <Typography variant="h4" className="OrganisationDesRecherchesTitre">Organisation des recherches</Typography>
      {contenu()}
    </Container>
  </div>;
}
