import Typography from '@material-ui/core/Typography';
import React, {useState} from 'react';
import './OrganisationDesRecherches.css';
import {Container, Fab} from '@material-ui/core';
import {useRecherches} from '../api/recherches.hooks';
import {Erreur} from '../components/Erreur';
import {FenetreDeSaisieDeRecherche} from './FenetreDeSaisieDeRecherche';
import {useIndividus} from '../api/arbres.hooks';
import {ListeDesRecherches} from './ListeDesRecherches';
import {Add} from '@material-ui/icons';
import {useStyles} from '../useStyles';

export const OrganisationDesRecherches = () => {
  const {recherchesEnCoursDeChargement, recherchesEnErreur, recherches} = useRecherches();
  const {individusEnCoursDeChargement, individusEnErreur, individus} = useIndividus();

  const [fenetreDeSaisieOuverte, setFenetreDeSaisieOuverte] = useState(false);
  const classes = useStyles();

  return <>
    <Container maxWidth="lg" className="OrganisationDesRecherches">
      <Typography variant="h4" className="OrganisationDesRecherchesTitre">Organisation des recherches</Typography>
      <ListeDesRecherches
        enCoursDeChargement={recherchesEnCoursDeChargement || individusEnCoursDeChargement}
        recherches={recherches?.recherches} />
    </Container>
    <FenetreDeSaisieDeRecherche
      ouverte={fenetreDeSaisieOuverte}
      fermer={() => setFenetreDeSaisieOuverte(false)}
      individus={individus}
    />
    {recherchesEnErreur && <Erreur message={recherchesEnErreur}/>}
    {individusEnErreur && <Erreur message={individusEnErreur}/>}
    <Fab
      variant="extended"
      size="medium"
      color="primary"
      className={classes.fab}
      onClick={() => setFenetreDeSaisieOuverte(true)}
    >
      <Add />
      Ajouter
    </Fab>
  </>;
}
