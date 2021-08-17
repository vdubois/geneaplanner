import List from '@material-ui/core/List';
import {Hidden, ListItem, makeStyles, styled} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {Recherche} from './Recherche';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import React, {useEffect, useState} from "react";
import {Skeleton} from '@material-ui/lab';
import {ChevronRight} from '@material-ui/icons';
import {priorites} from './priorites';
import {useHistory} from 'react-router-dom';

const SQUELETTES = Array.from(
  {length: 5},
  () => ({})
);

const useStyles = makeStyles((theme) => ({
  listeIndividus: {
    marginTop: theme.spacing(2),
  },
  elementDeListe: {
    minHeight: theme.spacing(7),
  },
}))

const MarqueurDeSelection = styled(ListItemIcon)({
  justifyContent: "flex-end",
  minWidth: 20,
});

export const ListeDesRecherches = ({enCoursDeChargement, recherches}) => {
  const classes = useStyles();
  const [individus, setIndividus] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (recherches && !enCoursDeChargement) {
      setIndividus(Object.keys(recherches));
    }
  }, [recherches, enCoursDeChargement]);

  const priorite = (valeurPriorite) => priorites.find(priorite => priorite.valeur === valeurPriorite)?.libelle;

  return <List disablePadding className={classes.listeIndividus}>
    <Hidden smDown>
      <ListItem disabled className={classes.elementDeListe}>
        <Recherche
          entete
          nomDeLIndividu={
            <Typography variant="body2">
              Nom de l'individu
            </Typography>
          }
          priorite={
            <Typography variant="body2">
              Priorit&eacute;
            </Typography>
          }
          nombreDeNotes={
            <Typography variant="body2">
              Nombre de notes
            </Typography>
          }
          nombreDeRecherches={
            <Typography variant="body2">
              Nombre de recherches
            </Typography>
          }
        />
        <MarqueurDeSelection />
      </ListItem>
      <Divider component="li" />
    </Hidden>
    {enCoursDeChargement && SQUELETTES.map((individu, index) => (
      <React.Fragment key={'fragment-' + index}>
        <ListItem
          button
          className={classes.elementDeListe}
        >
          <Recherche
            key={index}
            nomDeLIndividu={
              <Typography variant="body1" noWrap>
                <Skeleton width="80%" />
              </Typography>
            }
            priorite={
              <Typography variant="body2" color="secondary">
                <Skeleton width="80%" />
              </Typography>
            }
            nombreDeRecherches={
              <Typography variant="body2" color="secondary">
                <Skeleton width="10%" />
              </Typography>
            }
            nombreDeNotes={
              <Typography variant="body2" color="secondary" data-testid="cutter-maintenance-status">
                <Skeleton width="10%" />
              </Typography>
            }
          />
        </ListItem>
        <Divider component="li" />
      </React.Fragment>
    ))}
    {individus?.length > 0 && individus.map((individu, index) => (
      <React.Fragment key={'fragment-' + index}>
        <ListItem
          button
          onClick={() => history.push('/organiser-les-recherches/' + individu)}
          className={classes.elementDeListe}
        >
          <Recherche
            key={index}
            nouveau={!(recherches[individu]?.recherches?.length > 0) && !(recherches[individu]?.notes?.length > 0)}
            nomDeLIndividu={
              <Typography variant="body1" noWrap>
                {recherches[individu]?.nomDeLIndividu}
              </Typography>
            }
            priorite={
              <Typography variant="body2" color="secondary" data-testid="cutter-maintenance-status">
                {priorite(recherches[individu]?.priorite)}
              </Typography>
            }
            nombreDeRecherches={
              <Typography variant="body2" color="secondary" data-testid="cutter-maintenance-status">
                {recherches[individu]?.recherches?.length || '-'}
              </Typography>
            }
            nombreDeNotes={
              <Typography variant="body2" color="secondary" data-testid="cutter-maintenance-status">
                {recherches[individu]?.notes?.length || '-'}
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
    {!individus && !enCoursDeChargement && <ListItem
      className={classes.elementDeListe}
      ><Typography variant="body1" className={classes.elementDeListe}>Aucune recherche en cours</Typography>
    </ListItem>}
  </List>
}
