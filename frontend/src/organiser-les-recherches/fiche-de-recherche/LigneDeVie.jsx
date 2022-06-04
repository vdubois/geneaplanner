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
        <Typography>Le {dateAsString(individu.naissance.date)} &agrave; {individu.naissance.lieu}</Typography>
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
        <Typography>Le {dateAsString(individu.mariage.date)} &agrave; {individu.mariage.lieu}</Typography>
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
        <Typography>Le {dateAsString(individu.deces.date)} &agrave; {individu.deces.lieu}</Typography>
      </TimelineContent>
    </TimelineItem>}
  </Timeline>;
}
