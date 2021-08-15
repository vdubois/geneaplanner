import Typography from '@material-ui/core/Typography';
import React, {useState} from 'react';
import './OrganisationDesRecherches.css';
import {Container} from '@material-ui/core';
import {useRecherches} from '../api/recherches.hooks';
import {RecherchesEnCoursDeChargement} from './RecherchesEnCoursDeChargement';
import {AucuneRecherche} from './AucuneRecherche';
import {Recherche} from './Recherche';
import {Erreur} from '../components/Erreur';
import {FenetreDeSaisieDeRecherche} from './FenetreDeSaisieDeRecherche';
import {useIndividus} from '../api/arbres.hooks';

export const OrganisationDesRecherches = () => {
  const {recherchesEnCoursDeChargement, recherchesEnErreur, recherches} = useRecherches();
  const {individusEnCoursDeChargement, individusEnErreur, individus} = useIndividus();

  const [fenetreDeSaisieOuverte, setFenetreDeSaisieOuverte] = useState(false);

  const contenu = () => {
    if (recherchesEnCoursDeChargement || individusEnCoursDeChargement) {
      return <RecherchesEnCoursDeChargement />
    }
    if (recherches && recherches.recherches) {
      const individus = Object.keys(recherches.recherches);
      if (individus.length === 0) {
        return <AucuneRecherche
          setFenetreDeSaisieOuverte={setFenetreDeSaisieOuverte} />
      }
      return individus.map(individu => <Recherche
        key={individu}
        nomDeLIndividu={recherches.recherches[individu].nomDeLIndividu}
        priorite={recherches.recherches[individu].priorite}
        nombreDeRecherches={recherches.recherches[individu].recherches?.length}
        nombreDeNotes={recherches.recherches[individu].notes?.length}
      />)
    }
    return <AucuneRecherche
      setFenetreDeSaisieOuverte={setFenetreDeSaisieOuverte} />;
  }

  return <div className="OrganisationDesRecherches">
    <Container maxWidth="md">
      <Typography variant="h4" className="OrganisationDesRecherchesTitre">Organisation des recherches</Typography>
      {contenu()}
    </Container>
    <FenetreDeSaisieDeRecherche
      ouverte={fenetreDeSaisieOuverte}
      fermer={() => setFenetreDeSaisieOuverte(false)}
      individus={individus}
    />
    {recherchesEnErreur && <Erreur message={recherchesEnErreur}/>}
    {individusEnErreur && <Erreur message={individusEnErreur}/>}
  </div>;
}
