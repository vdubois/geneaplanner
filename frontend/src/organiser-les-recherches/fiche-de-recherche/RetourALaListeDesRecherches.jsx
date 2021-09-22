import React from 'react';
import {ChevronLeft} from '@mui/icons-material';
import {useHistory} from 'react-router-dom';
import {Box, Button} from '@mui/material';

export const RetourALaListeDesRecherches = () => {
  const history = useHistory()

  const retourVersLaListeDesRecherches = () => history.push('/organiser-les-recherches');

  return (
    <Box pb={1}>
      <Button
        variant="text"
        onClick={retourVersLaListeDesRecherches}
        startIcon={<ChevronLeft />}
      >
        Retour &agrave; la liste
      </Button>
    </Box>
  )
}
