import React, {useState} from "react";
import {Container, Fab} from '@material-ui/core';
import './PreparationPassageAuxArchives.css';
import Typography from '@material-ui/core/Typography';
import {useArchives} from '../api/archives.hooks';
import {useAuth0} from '@auth0/auth0-react';
import {Erreur} from '../components/Erreur';
import {useStyles} from '../useStyles';
import {Add} from '@material-ui/icons';
import {FenetreDeSaisieDArchive} from './FenetreDeSaisieDArchive';
import {ListeDesArchives} from './ListeDesArchives';

export const PreparationPassageAuxArchives = () => {
    const {isAuthenticated} = useAuth0();
    const {archivesEnCoursDeChargement, archivesEnErreur, archives} = useArchives(isAuthenticated);

    const [fenetreDeSaisieOuverte, setFenetreDeSaisieOuverte] = useState(false);
    const classes = useStyles();

    return <>
        <Container maxWidth="lg" className="PreparationPassageAuxArchives">
            <Typography variant="h4" className="OrganisationDesRecherchesTitre">Recherches aux archives</Typography>
            <ListeDesArchives
                enCoursDeChargement={archivesEnCoursDeChargement}
                archives={archives}
            />
        </Container>
        <FenetreDeSaisieDArchive
          ouverte={fenetreDeSaisieOuverte}
          fermer={() => setFenetreDeSaisieOuverte(false)}
        />
        {archivesEnErreur && <Erreur message={archivesEnErreur.message}/>}
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
