import {useNavigate} from 'react-router-dom';
import {Hidden, ListItem, ListItemButton, Skeleton} from '@mui/material';
import Typography from '@mui/material/Typography';
import {MarqueurDeSelection} from '../components/MarqueurDeSelection';
import Divider from '@mui/material/Divider';
import React from 'react';
import List from '@mui/material/List';
import {Archive} from './Archive';
import {ChevronRight} from '@mui/icons-material';
import {styled} from "@mui/material/styles";

const SQUELETTES = Array.from(
  {length: 5},
  () => ({})
);

export const ListeDesArchives = ({enCoursDeChargement, archives}) => {
  const navigateTo = useNavigate();

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
              Nom du lieu
            </Typography>
          }
          registres={
            <Typography variant="body2">
              Registres à consulter
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
            registres={
              <Typography variant="body2" color="secondary">
                <Skeleton width="200px" />
              </Typography>
            }
            adresse={
              <Typography variant="body2" color="secondary">
                <Skeleton width="200px" height="100px" />
              </Typography>
            }
            horaires={
              <Typography variant="body2" color="secondary">
                <Skeleton width="200px" height="100px" />
              </Typography>
            }
          />
        </ElementDeListeCliquable>
        <Divider component="li" />
      </React.Fragment>
    ))}
    {archives?.length > 0 && archives.map((archive, index) => (
      <React.Fragment key={'fragment-' + index}>
        <ElementDeListeCliquable
          onClick={() => navigateTo('/preparer-passage-aux-archives/' + archive.id)}
        >
          <Archive
            key={index}
            nom={
              <Typography variant="body1" noWrap style={{fontSize: '1rem', fontWeight: 'bold'}}>
                {archive.libelle}
              </Typography>
            }
            siteInternet={archive.siteInternet}
            siteInternetEtatCivil={archive.siteInternetEtatCivil}
            adresse={archive.adresse}
            horaires={archive.horaires}
            registres={
              <Typography variant="body2" color="secondary" data-testid="cutter-maintenance-status">
                {archive.registres.length}
              </Typography>
            }
          />
          <MarqueurDeSelection>
            {!enCoursDeChargement && (
              <ChevronRight fontSize="small" />
            )}
          </MarqueurDeSelection>
        </ElementDeListeCliquable>
        <Divider component="li" />
      </React.Fragment>
    ))}
    {archives?.length === 0 && !enCoursDeChargement && <ElementDeListe
    ><AucunResultat variant="body1">Aucun lieu d'archive en cours</AucunResultat>
    </ElementDeListe>}
  </Liste>;
}
