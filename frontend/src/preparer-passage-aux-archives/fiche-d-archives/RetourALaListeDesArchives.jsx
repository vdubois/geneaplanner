import React from 'react';
import {ChevronLeft} from '@material-ui/icons';
import {useHistory} from 'react-router-dom';
import {Button} from '@material-ui/core';

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
