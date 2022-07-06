import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator
} from '@mui/lab';
import Typography from '@mui/material/Typography';
import React from "react";
import {dateAsString} from "../../dates";

export const LigneDeVie = ({individu}) => {
  return <Timeline align="alternate">
    {individu?.naissance && <TimelineItem>
      <TimelineOppositeContent>
        <Typography>Naissance</Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        {individu.naissance.date && <Typography>Le {dateAsString(individu.naissance.date)} {individu.naissance.lieu && `à ${individu.naissance.lieu}`}</Typography>}
        {!individu.naissance.date && <Typography>A {individu.naissance.lieu}</Typography>}
      </TimelineContent>
    </TimelineItem>}
    {individu?.fiancailles && <TimelineItem>
      <TimelineOppositeContent>
        <Typography>Fian&ccedil;ailles</Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        {individu.fiancailles.date && <Typography>Le {dateAsString(individu.fiancailles.date)} {individu.fiancailles.lieu && `à ${individu.fiancailles.lieu}`}{individu.fiancailles.fiance && ` avec ${individu.fiancailles.fiance}`}</Typography>}
        {!individu.fiancailles.date && <Typography>{individu.fiancailles.lieu} {individu.fiancailles.fiance && ` avec ${individu.fiancailles.fiance}`}</Typography>}
      </TimelineContent>
    </TimelineItem>}
    {individu?.mariage && <TimelineItem>
      <TimelineOppositeContent>
        <Typography>Mariage</Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        {individu.mariage.date && <Typography>Le {dateAsString(individu.mariage.date)} {individu.mariage.lieu && `à ${individu.mariage.lieu}`}{individu.mariage.epouse && ` avec ${individu.mariage.epouse}`}</Typography>}
        {!individu.mariage.date && <Typography>{individu.mariage.lieu} {individu.mariage.epouse && ` avec ${individu.mariage.epouse}`}</Typography>}
      </TimelineContent>
    </TimelineItem>}
    {individu?.deces && <TimelineItem>
      <TimelineOppositeContent>
        <Typography>D&eacute;c&egrave;s</Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        {individu.deces.date && <Typography>Le {dateAsString(individu.deces.date)} {individu.deces.lieu && `à ${individu.deces.lieu}`}</Typography>}
        {!individu.deces.date && <Typography>{individu.deces.lieu && `A ${individu.deces.lieu}`}</Typography>}
      </TimelineContent>
    </TimelineItem>}
  </Timeline>;
}
