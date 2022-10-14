// @ts-ignore
import React from "react";
import {styled} from "@mui/material/styles";
import List from "@mui/material/List";
import {Hidden, ListItem, ListItemButton, Skeleton} from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {Registre} from './Registre';

const SQUELETTES = Array.from(
    {length: 5},
    () => ({})
);

export const ListeDesRegistres = ({enCoursDeChargement, registres}) => {
  const Liste = styled(List)(({theme}) => ({
    marginTop: theme.spacing(2)
  }));

  const ElementDeListe = styled(ListItem)(({theme}) => ({
    minHeight: theme.spacing(7),
    display: 'flex',
    alignItems: 'center'
  }));

  const ElementDeListeBouton = styled(ListItemButton)(({theme}) => ({
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
        <Registre
            entete
            individu={
              <Typography variant="body2">
                Individu
              </Typography>
            }
            reference={
              <Typography variant="body2">
                Référence de registre
              </Typography>
            }
            commentaires={
              <Typography variant="body2">
                Commentaire
              </Typography>
            }
            actions={
              <Typography variant="body2">
                Actions
              </Typography>
            }
        />
      </ElementDeListe>
      <Divider component="li" />
    </Hidden>
    {enCoursDeChargement && SQUELETTES.map((individu, index) => (
        <React.Fragment key={'fragment-' + index}>
          <ElementDeListeBouton>
            <Registre
                key={index}
                individu={
                  <Typography variant="body1" noWrap>
                    <Skeleton width="300px" />
                  </Typography>
                }
                reference={
                  <Typography variant="body2">
                    <Skeleton width="30px" />
                  </Typography>
                }
                commentaires={
                  <Typography variant="body2">
                    <Skeleton width="30px" />
                  </Typography>
                }
                actions={
                  <Typography variant="body2">
                    <Skeleton width="30px" />
                  </Typography>
                }
            />
          </ElementDeListeBouton>
          <Divider component="li" />
        </React.Fragment>
    ))}
    {registres?.length > 0 && registres.map((registre, index) => (
        <React.Fragment key={'fragment-' + index}>
          <ElementDeListeBouton>
            <Registre
                key={index}
                individu={
                  <Typography variant="body1">
                    {registre.libelle}
                  </Typography>
                }
                reference={
                  <Typography variant="body2">
                    {registre.reference}
                  </Typography>
                }
                commentaires={
                  <Typography variant="body2">
                    {registre.commentaire}
                  </Typography>
                }
                actions={
                  <Typography variant="body2">
                  </Typography>
                }
            />
          </ElementDeListeBouton>
          <Divider component="li" />
        </React.Fragment>
    ))}
    {(!registres || registres?.length === 0) && !enCoursDeChargement && <ElementDeListe
    ><AucunResultat variant="body1">Aucun registre en cours</AucunResultat>
    </ElementDeListe>}
  </Liste>
}
