import List from '@mui/material/List';
import {Hidden, ListItem, Skeleton} from '@mui/material';
import Typography from '@mui/material/Typography';
import {Recherche} from './Recherche';
import Divider from '@mui/material/Divider';
import React, {useEffect, useState} from "react";
import {ChevronRight} from '@mui/icons-material';
import {libellePriorite} from './priorites';
import {useNavigate} from 'react-router-dom';
import {MarqueurDeSelection} from '../components/MarqueurDeSelection';
import {styled} from "@mui/material/styles";

const SQUELETTES = Array.from(
  {length: 5},
  () => ({})
);

export const ListeDesRecherches = ({enCoursDeChargement, recherches}) => {
  const [individus, setIndividus] = useState(null);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (recherches && !enCoursDeChargement) {
      setIndividus(Object.keys(recherches));
    }
  }, [recherches, enCoursDeChargement]);

  const Liste = styled(List)(({theme}) => ({
    marginTop: theme.spacing(2)
  }));

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

  return <Liste disablePadding>
    <Hidden smDown>
      <ElementDeListe disabled>
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
      </ElementDeListe>
      <Divider component="li" />
    </Hidden>
    {enCoursDeChargement && SQUELETTES.map((individu, index) => (
      <React.Fragment key={'fragment-' + index}>
        <ElementDeListe
          button
        >
          <Recherche
            key={index}
            nomDeLIndividu={
              <Typography variant="body1" noWrap>
                <Skeleton width="200px" />
              </Typography>
            }
            priorite={
              <Typography variant="body2" color="secondary">
                <Skeleton width="100px" />
              </Typography>
            }
            nombreDeRecherches={
              <Typography variant="body2" color="secondary">
                <Skeleton width="30px" />
              </Typography>
            }
            nombreDeNotes={
              <Typography variant="body2" color="secondary" data-testid="cutter-maintenance-status">
                <Skeleton width="30px" />
              </Typography>
            }
          />
        </ElementDeListe>
        <Divider component="li" />
      </React.Fragment>
    ))}
    {individus?.length > 0 && individus.map((individu, index) => (
      <React.Fragment key={'fragment-' + index}>
        <ElementDeListe
          button
          onClick={() => navigateTo('/organiser-les-recherches/' + individu)}
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
                {libellePriorite(recherches[individu]?.priorite)}
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
        </ElementDeListe>
        <Divider component="li" />
      </React.Fragment>
    ))}
    {individus?.length === 0 && !enCoursDeChargement && <ElementDeListe
      ><AucunResultat variant="body1">Aucune recherche en cours</AucunResultat>
    </ElementDeListe>}
  </Liste>
}
