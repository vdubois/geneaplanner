import React from 'react';
import {ChevronLeft} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import {Button} from '@mui/material';

export const RetourALaListeDesArchives = () => {
  const navigateTo = useNavigate()

  const retourVersLaListeDesArchives = () => navigateTo('/preparer-passage-aux-archives');

  return (
    <Button
      variant="text"
      onClick={retourVersLaListeDesArchives}
      startIcon={<ChevronLeft/>}
    >
      Retour &agrave; la liste
    </Button>
  )
}
