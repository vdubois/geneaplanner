import List from '@material-ui/core/List';
import {Hidden, ListItem, makeStyles, styled} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {Recherche} from './Recherche';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import React, {useEffect, useState} from "react";
import {Skeleton} from '@material-ui/lab';
import {ChevronRight} from '@material-ui/icons';

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

  useEffect(() => {
    if (recherches && !enCoursDeChargement) {
      setIndividus(Object.keys(recherches));
    }
  }, [recherches, enCoursDeChargement]);

  return <List disablePadding className={classes.listeIndividus}>
    <Hidden smDown>
      <ListItem disabled className={classes.elementDeListe}>
        <Recherche
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
    {(individus || SQUELETTES).map((individu, index) => (
      <React.Fragment key={'fragment-' + index}>
        <ListItem
          button
          onClick={() => {}/*goToEquipmentDetail(individu.serialNumber)*/}
          className={classes.elementDeListe}
        >
          <Recherche
            key={index}
            nomDeLIndividu={
              <Typography variant="body1" noWrap>
                {enCoursDeChargement ? <Skeleton width="80%" /> : recherches[individu]?.nomDeLIndividu}
              </Typography>
            }
            priorite={
              <Typography variant="body2" color="secondary" data-testid="cutter-maintenance-status">
                {enCoursDeChargement ? <Skeleton width="80%" /> : recherches[individu]?.priorite}
              </Typography>
            }
            nombreDeRecherches={
              <Typography variant="body2" color="secondary" data-testid="cutter-maintenance-status">
                {enCoursDeChargement ? <Skeleton width="10%" /> : recherches[individu]?.recherches?.length || '-'}
              </Typography>
            }
            nombreDeNotes={
              <Typography variant="body2" color="secondary" data-testid="cutter-maintenance-status">
                {enCoursDeChargement ? <Skeleton width="10%" /> : recherches[individu]?.notes?.length || '-'}
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
  </List>
}
