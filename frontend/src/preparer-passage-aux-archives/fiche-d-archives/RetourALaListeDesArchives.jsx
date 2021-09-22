import React from 'react';
import {ChevronLeft} from '@mui/icons-material';
import {useHistory} from 'react-router-dom';
import {Button} from '@mui/material';

export const RetourALaListeDesArchives = () => {
  const history = useHistory()

  const retourVersLaListeDesArchives = () => history.push('/preparer-passage-aux-archives');

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
