import {Box, Button, Hidden, ListItem, Skeleton} from '@mui/material';
import Typography from '@mui/material/Typography';
import {FlexGrow} from '../../components/FlexGrow';
import {LigneRecherche} from './LigneRecherche';
import Divider from '@mui/material/Divider';
import React from 'react';
import {libellePriorite} from '../priorites';
import {useStyles} from '../../useStyles';

export const Recherches = ({
  setFenetreDeSaisieDeRechercheOuverte,
  enCoursDeChargement,
  recherchesDeLIndividu,
  identifiantIndividu
}) => {
  const classes = useStyles();

  return <>
    {enCoursDeChargement && <Box
      display="flex"
      flexDirection="column">
      <Skeleton variant="rect" width="100%" height="100px"/>
      <Skeleton variant="rect" width="100%" height="100px"/>
    </Box>}
    {!enCoursDeChargement && <>
      <Box display="flex" flexWrap="wrap">
        <Typography variant="h5">Recherches</Typography>
        <FlexGrow/>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setFenetreDeSaisieDeRechercheOuverte(true)}
        >Ajouter</Button>
      </Box>
      <Hidden smDown>
        <ListItem disabled className={classes.elementDeListe}>
          <LigneRecherche
            entete
            nom={
              <Typography variant="body2">
                Nom
              </Typography>
            }
            priorite={
              <Typography variant="body2">
                Priorit&eacute;
              </Typography>
            }
            commentaire={
              <Typography variant="body2">
                Commentaire
              </Typography>
            }
            lien={
              <Typography variant="body2">
                Lien
              </Typography>
            }
          />
        </ListItem>
        <Divider/>
      </Hidden>
      {recherchesDeLIndividu?.length > 0 && recherchesDeLIndividu.map((recherche, index) => (
        <React.Fragment key={'fragment-recherche-' + index}>
          <ListItem
            className={classes.elementDeListe}
          >
            <LigneRecherche
              identifiantIndividu={identifiantIndividu}
              identifiantNote={recherche.id}
              key={index}
              nom={
                <Typography variant="body1" noWrap>
                  {recherche.nom}
                </Typography>
              }
              priorite={
                <Typography variant="body2" color="secondary" data-testid="cutter-maintenance-status">
                  {libellePriorite(recherche.priorite)}
                </Typography>
              }
              lien={
                <Typography variant="body2" color="secondary" data-testid="cutter-maintenance-status">
                  {recherche.lien}
                </Typography>
              }
              commentaire={
                <Typography variant="body2" color="secondary" data-testid="cutter-maintenance-status">
                  {recherche.commentaire}
                </Typography>
              }
            />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
      {recherchesDeLIndividu?.length === 0 && !enCoursDeChargement && <ListItem
        className={classes.elementDeListe}
      ><Typography variant="body1" className={classes.elementDeListe}>Aucune recherche en cours</Typography>
      </ListItem>}
    </>}
  </>;
}
