import {Box, Hidden, IconButton, ListItem, ListItemButton, Skeleton} from '@mui/material';
import Typography from '@mui/material/Typography';
import {MarqueurDeSelection} from '../../components/MarqueurDeSelection';
import Divider from '@mui/material/Divider';
import React from 'react';
import List from '@mui/material/List';
import {Archive} from './Archive';
import {ChevronRight, Delete, Edit, Language, ScreenSearchDesktop} from '@mui/icons-material';
import {styled} from "@mui/material/styles";
import {Modifier} from "./Modifier";
import {Supprimer} from "./Supprimer";

const SQUELETTES = Array.from(
  {length: 5},
  () => ({})
);

export const ListeDesArchives = ({enCoursDeChargement, archives, setArchive, setFenetreDeSaisieOuverte}) => {

  const Liste = styled(List)(({theme}) => ({
    marginTop: theme.spacing(2)
  }));

  const ElementDeListe = styled(ListItem)(({theme}) => ({
    minHeight: theme.spacing(7),
    display: 'flex',
    alignItems: 'center'
  }));

  const ElementDeListeCliquable = styled(ListItemButton)(({theme}) => ({
    minHeight: theme.spacing(7),
    display: 'flex',
    alignItems: 'center'
  }));

  const AucunResultat = styled(Typography)(({theme}) => ({
    minHeight: theme.spacing(7),
    display: 'flex',
    alignItems: 'center'
  }));

  return <Liste disablePadding>
    <Hidden smDown>
      <ElementDeListe disabled>
        <Archive
          entete
          nom={
            <Typography variant="body2">
              Nom des archives
            </Typography>
          }
          actions={
            <Typography variant="body2">
              Actions
            </Typography>
          }
        />
        <MarqueurDeSelection />
      </ElementDeListe>
      <Divider component="li" />
    </Hidden>
    {enCoursDeChargement && SQUELETTES.map((archive, index) => (
      <React.Fragment key={'fragment-' + index}>
        <ElementDeListeCliquable>
          <Archive
            key={index}
            nom={
              <Typography variant="body1" noWrap>
                <Skeleton width="250px" />
              </Typography>
            }
            actions={
              <Typography variant="body2" color="secondary">
                <Skeleton width="200px" />
              </Typography>
            }
          />
        </ElementDeListeCliquable>
        <Divider component="li" />
      </React.Fragment>
    ))}
    {archives?.length > 0 && archives.map((archive, index) => (
      <React.Fragment key={'fragment-' + index}>
        <ElementDeListeCliquable>
          <Archive
            key={index}
            nom={
              <Box display="flex" gap="10px" alignItems="center">
                <Typography variant="body1" noWrap>
                  {archive.libelle}
                </Typography>
                <Box display="flex" alignItems="center">
                  {archive.siteInternet && <IconButton onClick={() => window.open(archive.siteInternet, '_blank')}>
                    <Language/>
                  </IconButton>}
                  {archive.siteInternetEtatCivil && <IconButton onClick={() => window.open(archive.siteInternetEtatCivil, '_blank')}>
                    <ScreenSearchDesktop/>
                  </IconButton>}
                </Box>
              </Box>
            }
            actions={
              <Box display="flex" gap="10px" alignItems="center">
                <Modifier archive={archive} setArchive={setArchive} setFenetreDeSaisieOuverte={setFenetreDeSaisieOuverte}/>
                <Supprimer archive={archive}/>
              </Box>
            }
          />
          <MarqueurDeSelection>
          </MarqueurDeSelection>
        </ElementDeListeCliquable>
        <Divider component="li" />
      </React.Fragment>
    ))}
    {archives?.length === 0 && !enCoursDeChargement && <ElementDeListe
    ><AucunResultat variant="body1">Aucune archive en cours</AucunResultat>
    </ElementDeListe>}
  </Liste>;
}
