import {useNavigate, useParams} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import {Box, Button, CircularProgress, Container, Skeleton} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {RetourALaListeDesArchives} from './RetourALaListeDesArchives';
import {useDetailArchives, useSupprimerArchive} from '../../api/archives.hooks';
import {Add, Done} from '@mui/icons-material';
import {useAuth0} from '@auth0/auth0-react';
import {useIndividus} from '../../api/arbres.hooks';
import {FenetreDeSaisieDeRegistre} from './FenetreDeSaisieDeRegistre';
import {ListeDesRegistres} from './ListeDesRegistres';
import {FlexGrow} from '../../components/FlexGrow';
import {dateAsString} from "../../dates";

export const FicheDArchives = () => {
  const navigateTo = useNavigate();
  let {archive} = useParams();
  const {isAuthenticated} = useAuth0();

  const {individusEnCoursDeChargement, arbre} = useIndividus(isAuthenticated);
  const {archivesEnCoursDeChargement, archives} = useDetailArchives(archive, isAuthenticated);
  const supprimerFicheDArchives = useSupprimerArchive(archive);
  const [enCoursDeCloture, setEnCoursDeCloture] = useState(false);

  const supprimerLaFiche = async () => {
    try {
      setEnCoursDeCloture(true);
      await supprimerFicheDArchives();
      navigateTo('/preparer-passage-aux-archives');
    } finally {
      setEnCoursDeCloture(false);
    }
  }
  const [fenetreDeSaisieDeRegistreOuverte, setFenetreDeSaisieDeRegistreOuverte] = useState(false);

  const libelleNaissance = (registre) => {
    let libelleNaissance = '';
    if (registre.individu.naissance) {
      const naissance = registre.individu.naissance;
      if (naissance.date) {
        libelleNaissance += `${dateAsString(naissance.date)} `;
      }
      if (naissance.lieu) {
        libelleNaissance += `à ${naissance.lieu}`
      }
      libelleNaissance += '.';
    }
    let libellePere = '';
    if (registre.individu.pere) {
      libellePere = <><br/>Père : <strong>{registre.individu.pere.nom}</strong></>;
    }
    let libelleMere = '';
    if (registre.individu.mere) {
      libelleMere = <><br/>Mère : <strong>{registre.individu.mere.nom}</strong></>;
    }
    return <span>Naissance de <strong>{registre.individu.nom}</strong> {libelleNaissance}{libellePere}{libelleMere}</span>;
  }

  const libelleDeces = (registre) => {
    let libelleDeces = '';
    if (registre.individu.deces) {
      const deces = registre.individu.deces;
      if (deces.date) {
        libelleDeces += `${dateAsString(deces.date)} `;
      }
      if (deces.lieu) {
        libelleDeces += `à ${deces.lieu}`
      }
      libelleDeces += '.';
    }
    let libellePere = '';
    if (registre.individu.pere) {
      libellePere = <><br/>Père : <strong>{registre.individu.pere.nom}</strong></>;
    }
    let libelleMere = '';
    if (registre.individu.mere) {
      libelleMere = <><br/>Mère : <strong>{registre.individu.mere.nom}</strong></>;
    }
    let libelleEpouse = '';
    if (registre.individu.mariage) {
      libelleEpouse = <><br/>&Eacute;pou{registre.individu.sexe === 'M' ? 'se' : 'x'} : <strong>{registre.individu.mariage.epouse}</strong></>
    }
    return <span>D&eacute;c&egrave;s de <strong>{registre.individu.nom}</strong> {libelleDeces}{libellePere}{libelleMere}{libelleEpouse}</span>;
  }

  const libelle = (registre) => {
    if (registre.evenement === 'BIRTH') {
      return libelleNaissance(registre);
    }
    if (registre.evenement === 'DEATH') {
      return libelleDeces(registre);
    }
    return JSON.stringify(registre);
  }

  useEffect(() => {
    if (archives?.registres?.length > 0) {
      archives.registres.filter(registre => !registre.libelle).forEach(registre => {
        registre.libelle = libelle(registre);
      });
    }
  }, [archives?.registres]);

  return <Container maxWidth="xl">
    <Typography variant="h4" className="OrganisationDesRecherchesTitre" align="center">
      {!arbre || !archives || archivesEnCoursDeChargement || individusEnCoursDeChargement ? <Skeleton variant="rect" width="50%"/> : "Registres de : " + archives?.libelle}
    </Typography>
    <Box display="flex" alignItems="center">
      <RetourALaListeDesArchives/>
      <FlexGrow/>
      <Box display="flex">
        {(!arbre || !archives || archivesEnCoursDeChargement || individusEnCoursDeChargement) && <>
          <Skeleton width={250} height={70} style={{marginRight: '10px'}}/>
          <Skeleton width={300} height={70}/>
        </>}
        {arbre && archives && <>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add/>}
            onClick={() => setFenetreDeSaisieDeRegistreOuverte(true)}>Ajouter un registre</Button>
          <Button
          variant="contained"
          startIcon={enCoursDeCloture ? <CircularProgress size={24} /> : <Done/>}
          disabled={enCoursDeCloture}
          style={enCoursDeCloture ? {marginLeft: '10px'} : {backgroundColor: '#4caf50', color: 'white', marginLeft: '10px'}}
          onClick={async () => await supprimerLaFiche()}>Clôturer le passage aux archives</Button>
        </>}
      </Box>
    </Box>
    {archives && archives.registres && <ListeDesRegistres
        enCoursDeChargement={archivesEnCoursDeChargement}
        registres={archives.registres}
    />}
    {archive && <FenetreDeSaisieDeRegistre
      individus={arbre?.individus}
      ouverte={fenetreDeSaisieDeRegistreOuverte}
      fermer={() => setFenetreDeSaisieDeRegistreOuverte(false)}
      archives={archive}
    />}
  </Container>;
}
