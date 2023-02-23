import {Box, Button, Hidden, ListItem, Skeleton} from '@mui/material';
import Typography from '@mui/material/Typography';
import {FlexGrow} from '../../components/FlexGrow';
import {LigneRecherche} from './LigneRecherche';
import Divider from '@mui/material/Divider';
import React from 'react';
import {libellePriorite} from '../priorites';
import {styled} from "@mui/material/styles";

export const Recherches = ({
  setFenetreDeSaisieDeRechercheOuverte,
  enCoursDeChargement,
  recherchesDeLIndividu,
  identifiantIndividu
}) => {
  const ElementDeListe = styled(ListItem)(({theme}) => ({
    minHeight: theme.spacing(7),
    display: 'flex',
    alignItems: 'center'
  }));

  const AucunResultat = styled(Typography)(({theme}) => ({
    minHeight: theme.spacing(7),
    display: 'flex',
    alignItems: 'center'
  }));

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
        <ElementDeListe disabled>
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
        </ElementDeListe>
        <Divider/>
      </Hidden>
      {recherchesDeLIndividu?.length > 0 && recherchesDeLIndividu.map((recherche, index) => (
        <React.Fragment key={'fragment-recherche-' + index}>
          <ElementDeListe>
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
          </ElementDeListe>
          <Divider />
        </React.Fragment>
      ))}
      {recherchesDeLIndividu?.length === 0 && !enCoursDeChargement && <ElementDeListe
      ><AucunResultat variant="body1">Aucune recherche en cours</AucunResultat>
      </ElementDeListe>}
    </>}
  </>;
}
