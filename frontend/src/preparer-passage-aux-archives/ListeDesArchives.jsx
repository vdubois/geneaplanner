import {useStyles} from '../useStyles';
import {useNavigate} from 'react-router-dom';
import {Hidden, ListItem, Skeleton} from '@mui/material';
import Typography from '@mui/material/Typography';
import {MarqueurDeSelection} from '../components/MarqueurDeSelection';
import Divider from '@mui/material/Divider';
import React from 'react';
import List from '@mui/material/List';
import {Archive} from './Archive';
import {ChevronRight} from '@mui/icons-material';

const SQUELETTES = Array.from(
  {length: 5},
  () => ({})
);

export const ListeDesArchives = ({enCoursDeChargement, archives}) => {
  const classes = useStyles();
  const navigateTo = useNavigate();

  return <List disablePadding className={classes.liste}>
    <Hidden smDown>
      <ListItem disabled className={classes.elementDeListe}>
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
      </ListItem>
      <Divider component="li" />
    </Hidden>
    {enCoursDeChargement && SQUELETTES.map((archive, index) => (
      <React.Fragment key={'fragment-' + index}>
        <ListItem
          button
          className={classes.elementDeListe}
        >
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
          />
        </ListItem>
        <Divider component="li" />
      </React.Fragment>
    ))}
    {archives?.length > 0 && archives.map((archive, index) => (
      <React.Fragment key={'fragment-' + index}>
        <ListItem
          button
          onClick={() => navigateTo('/preparer-passage-aux-archives/' + archive.id)}
          className={classes.elementDeListe}
        >
          <Archive
            key={index}
            nom={
              <Typography variant="body1" noWrap>
                {archive.libelle}
              </Typography>
            }
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
        </ListItem>
        <Divider component="li" />
      </React.Fragment>
    ))}
    {archives?.length === 0 && !enCoursDeChargement && <ListItem
      className={classes.elementDeListe}
    ><Typography variant="body1" className={classes.elementDeListe}>Aucun lieu d'archive en cours</Typography>
    </ListItem>}
  </List>;
}
