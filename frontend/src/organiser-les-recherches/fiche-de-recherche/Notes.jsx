import {useStyles} from '../ListeDesRecherches';
import {Box, Button, Hidden, ListItem} from '@material-ui/core';
import {Skeleton} from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';
import {FlexGrow} from '../../components/FlexGrow';
import {LigneNote} from './LigneNote';
import Divider from '@material-ui/core/Divider';
import React from 'react';

export const Notes = ({setFenetreDeSaisieDeNoteOuverte, enCoursDeChargement, notesDeLIndividu}) => {
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
        <Typography variant="h5">Notes</Typography>
        <FlexGrow/>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setFenetreDeSaisieDeNoteOuverte(true)}
        >Ajouter</Button>
      </Box>
      <Hidden smDown>
        <ListItem disabled className={classes.elementDeListe}>
          <LigneNote
            contenu={
              <Typography variant="body2">
                Contenu
              </Typography>
            }
          />
        </ListItem>
        <Divider/>
      </Hidden>
      {notesDeLIndividu?.length > 0 && notesDeLIndividu.map((note, index) => (
        <React.Fragment key={'fragment-note-' + index}>
          <ListItem
            className={classes.elementDeListe}
          >
            <LigneNote
              key={index}
              contenu={
                <Typography variant="body1">
                  {note.contenu}
                </Typography>
              }
            />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
      {notesDeLIndividu?.length === 0 && !enCoursDeChargement && <ListItem
        className={classes.elementDeListe}
      ><Typography variant="body1" className={classes.elementDeListe}>Aucune note en cours</Typography>
      </ListItem>}
    </>}
  </>;
};
