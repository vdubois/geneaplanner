import React from 'react';
import {ChevronLeft} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import {Box, Button} from '@mui/material';

export const RetourALaListeDesRecherches = () => {
  const navigateTo = useNavigate()

  const retourVersLaListeDesRecherches = () => navigateTo('/organiser-les-recherches');

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
