import {useHistory, useParams} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import {Skeleton} from '@material-ui/lab';
import React, {useState} from 'react';
import {Container, Fab} from '@material-ui/core';
import {RetourALaListeDesArchives} from './RetourALaListeDesArchives';
import {useDetailArchives, useSupprimerArchive} from '../../api/archives.hooks';
import {Done} from '@material-ui/icons';
import {useStyles} from '../../useStyles';
import {useAuth0} from '@auth0/auth0-react';
import {useIndividus} from '../../api/arbres.hooks';
import {FenetreDeSaisieDeRegistre} from './FenetreDeSaisieDeRegistre';

export const FicheDArchives = () => {
  const classes = useStyles();
  const history = useHistory();
  let {archive} = useParams();
  const {isAuthenticated} = useAuth0();

  const {individusEnCoursDeChargement, individusEnErreur, individus} = useIndividus(isAuthenticated);
  const {archivesEnCoursDeChargement, archivesEnErreur, archives} = useDetailArchives(archive, isAuthenticated);
  const supprimerFicheDArchives = useSupprimerArchive(archive);

  const [fenetreDeSaisieDeRegistreOuverte, setFenetreDeSaisieDeRegistreOuverte] = useState(false);

  return <Container maxWidth="xl">
    <Typography variant="h4" className="OrganisationDesRecherchesTitre" align="center">
      {archivesEnCoursDeChargement ? <Skeleton variant="rect" width="50%"/> : "Registres de : " + archives?.libelle}
    </Typography>
    <RetourALaListeDesArchives/>
    <FenetreDeSaisieDeRegistre
      individus={individus}
      ouverte={fenetreDeSaisieDeRegistreOuverte}
      fermer={() => setFenetreDeSaisieDeRegistreOuverte(false)}
    />
    {individus && <Fab
      variant="extended"
      size="medium"
      color="secondary"
      className={classes.fab}
      style={{backgroundColor: '#4caf50', color: 'white'}}
      onClick={async () => {
        await supprimerFicheDArchives();
        history.push('/preparer-passage-aux-archives');
      }}
    >
      <Done style={{marginRight: '4px'}} />
      Clôturer le passage aux archives
    </Fab>}
  </Container>;
}
