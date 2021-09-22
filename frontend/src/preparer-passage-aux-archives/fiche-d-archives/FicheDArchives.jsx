import {useHistory, useParams} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import {Box, Button, CircularProgress, Container, Skeleton} from '@mui/material';
import React, {useState} from 'react';
import {RetourALaListeDesArchives} from './RetourALaListeDesArchives';
import {useDetailArchives, useSupprimerArchive} from '../../api/archives.hooks';
import {Add, Done} from '@mui/icons-material';
import {useStyles} from '../../useStyles';
import {useAuth0} from '@auth0/auth0-react';
import {useIndividus} from '../../api/arbres.hooks';
import {FenetreDeSaisieDeRegistre} from './FenetreDeSaisieDeRegistre';
import {ListeDesRegistres} from './ListeDesRegistres';
import {FlexGrow} from '../../components/FlexGrow';

export const FicheDArchives = () => {
  const classes = useStyles();
  const history = useHistory();
  let {archive} = useParams();
  const {isAuthenticated} = useAuth0();

  const {individusEnCoursDeChargement, individusEnErreur, individus} = useIndividus(isAuthenticated);
  const {archivesEnCoursDeChargement, archivesEnErreur, archives} = useDetailArchives(archive, isAuthenticated);
  const supprimerFicheDArchives = useSupprimerArchive(archive);
  const [enCoursDeCloture, setEnCoursDeCloture] = useState(false);

  const supprimerLaFiche = async () => {
    try {
      setEnCoursDeCloture(true);
      await supprimerFicheDArchives();
      history.push('/preparer-passage-aux-archives');
    } finally {
      setEnCoursDeCloture(false);
    }
  }
  const [fenetreDeSaisieDeRegistreOuverte, setFenetreDeSaisieDeRegistreOuverte] = useState(false);

  const [menuOuvert, setMenuOuvert] = useState(false);

  return <Container maxWidth="xl">
    <Typography variant="h4" className="OrganisationDesRecherchesTitre" align="center">
      {archivesEnCoursDeChargement || individusEnCoursDeChargement ? <Skeleton variant="rect" width="50%"/> : "Registres de : " + archives?.libelle}
    </Typography>
    <Box display="flex" alignItems="center">
      <RetourALaListeDesArchives/>
      <FlexGrow/>
      <Box display="flex">
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
      </Box>
    </Box>
    <ListeDesRegistres/>
    <FenetreDeSaisieDeRegistre
      individus={individus}
      ouverte={fenetreDeSaisieDeRegistreOuverte}
      fermer={() => setFenetreDeSaisieDeRegistreOuverte(false)}
    />
  </Container>;
}
