import {Box, Button, Hidden, ListItem, Skeleton} from '@mui/material';
import Typography from '@mui/material/Typography';
import {FlexGrow} from '../../components/FlexGrow';
import {LigneNote} from './LigneNote';
import Divider from '@mui/material/Divider';
import React from 'react';
import {styled} from "@mui/material/styles";

export const Notes = ({setFenetreDeSaisieDeNoteOuverte, enCoursDeChargement, notesDeLIndividu, identifiantIndividu}) => {
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
        <Typography variant="h5">Notes</Typography>
        <FlexGrow/>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setFenetreDeSaisieDeNoteOuverte(true)}
        >Ajouter</Button>
      </Box>
      <Hidden smDown>
        <ElementDeListe disabled>
          <LigneNote
            entete
            contenu={
              <Typography variant="body2">
                Contenu
              </Typography>
            }
          />
        </ElementDeListe>
        <Divider/>
      </Hidden>
      {notesDeLIndividu?.length > 0 && notesDeLIndividu.map((note, index) => (
        <React.Fragment key={'fragment-note-' + index}>
          <ElementDeListe>
            <LigneNote
              key={index}
              identifiantIndividu={identifiantIndividu}
              identifiantNote={note.id}
              contenu={
                <Typography variant="body1">
                  {note.contenu}
                </Typography>
              }
            />
          </ElementDeListe>
          <Divider />
        </React.Fragment>
      ))}
      {notesDeLIndividu?.length === 0 && !enCoursDeChargement && <ElementDeListe
      ><AucunResultat variant="body1">Aucune note en cours</AucunResultat>
      </ElementDeListe>}
    </>}
  </>;
};
