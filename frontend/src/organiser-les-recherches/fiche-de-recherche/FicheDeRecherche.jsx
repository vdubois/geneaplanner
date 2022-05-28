import {useNavigate, useParams} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import React, {useEffect, useState} from 'react';
import {Box, Container, Fab, Skeleton} from '@mui/material';
import {useIndividu} from '../../api/arbres.hooks';
import {LigneDeVie} from './LigneDeVie';
import {RetourALaListeDesRecherches} from './RetourALaListeDesRecherches';
import {FenetreDeSaisieDeRecherche} from './FenetreDeSaisieDeRecherche';
import {FenetreDeSaisieDeNote} from './FenetreDeSaisieDeNote';
import {useRecherches, useSupprimerRecherche} from '../../api/recherches.hooks';
import {Recherches} from './Recherches';
import {Notes} from './Notes';
import {Done} from '@mui/icons-material';
import {styled} from "@mui/material/styles";

export const FicheDeRecherche = () => {
  const navigateTo = useNavigate();
  let {individu: identifiantIndividu} = useParams();

  let {individuEnCoursDeChargement, individuEnErreur, individu} = useIndividu(identifiantIndividu);
  const {recherchesEnCoursDeChargement, recherchesEnErreur, recherches} = useRecherches();
  const supprimerFicheDeRecherche = useSupprimerRecherche(identifiantIndividu);

  const [fenetreDeSaisieDeRechercheOuverte, setFenetreDeSaisieDeRechercheOuverte] = useState(false);
  const [fenetreDeSaisieDeNoteOuverte, setFenetreDeSaisieDeNoteOuverte] = useState(false);
  const [recherchesDeLIndividu, setRecherchesDeLIndividu] = useState([]);
  const [notesDeLIndividu, setNotesDeLIndividu] = useState([]);

  const extraireRecherches = (recherchesAExtraire) => {
    return recherchesAExtraire.recherches[identifiantIndividu].recherches || [];
  }

  const extraireNotes = (recherchesAExtraire) => {
    return recherchesAExtraire.recherches[identifiantIndividu].notes || [];
  }

  useEffect(() => {
    if (!recherchesEnCoursDeChargement && recherches) {
      setRecherchesDeLIndividu(extraireRecherches(recherches));
      setNotesDeLIndividu(extraireNotes(recherches))
    }
  }, [recherches, recherchesEnCoursDeChargement])

  const StyledFab = styled(Fab)(({theme}) => ({
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }));

  return <>
    <Container maxWidth="xl">
      <Typography variant="h4" className="OrganisationDesRecherchesTitre" align="center">
        {individuEnCoursDeChargement ? <Skeleton variant="rect" width="50%"/> : "Recherches - " + individu?.nom}
      </Typography>
      <RetourALaListeDesRecherches/>
      <Box display="flex" justifyContent="center" gridGap={20} flexWrap="wrap">
        {individuEnCoursDeChargement ? <Skeleton variant="rect" width="35%" height="300px"/> :
          <LigneDeVie individu={individu}/>}
        <Box display="flex" flexDirection="column" width="60%">
          <Recherches
            identifiantIndividu={identifiantIndividu}
            enCoursDeChargement={recherchesEnCoursDeChargement}
            setFenetreDeSaisieDeRechercheOuverte={setFenetreDeSaisieDeRechercheOuverte}
            recherchesDeLIndividu={recherchesDeLIndividu}
          />
          <Box height="50px"/>
          <Notes
            identifiantIndividu={identifiantIndividu}
            notesDeLIndividu={notesDeLIndividu}
            enCoursDeChargement={recherchesEnCoursDeChargement}
            setFenetreDeSaisieDeNoteOuverte={setFenetreDeSaisieDeNoteOuverte}/>
        </Box>
      </Box>
      <FenetreDeSaisieDeRecherche
        identifiantIndividu={identifiantIndividu}
        ouverte={fenetreDeSaisieDeRechercheOuverte}
        fermer={() => setFenetreDeSaisieDeRechercheOuverte(false)}
      />
      <FenetreDeSaisieDeNote
        identifiantIndividu={identifiantIndividu}
        ouverte={fenetreDeSaisieDeNoteOuverte}
        fermer={() => setFenetreDeSaisieDeNoteOuverte(false)}
      />
    </Container>
    <StyledFab
      variant="extended"
      size="medium"
      color="secondary"
      style={{backgroundColor: '#4caf50', color: 'white'}}
      onClick={async () => {
        await supprimerFicheDeRecherche();
        navigateTo('/organiser-les-recherches');
      }}
    >
      <Done style={{marginRight: '4px'}} />
      Clôturer la recherche
    </StyledFab>
  </>;
}
