import {Timeline} from '@material-ui/icons';
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator
} from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';

export const LigneDeVie = ({individu}) => {
  return <Timeline align="alternate">
    <TimelineItem>
      <TimelineOppositeContent>
        <Typography>Naissance</Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Typography>Le {individu.naissance.date} &agrave; {individu.naissance.lieu}</Typography>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineOppositeContent>
        <Typography>Mariage</Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Typography><Typography>Le {individu.mariage.date} &agrave; {individu.mariage.lieu}</Typography></Typography>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineOppositeContent>
        <Typography>D&eacute;c&egrave;s</Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Typography><Typography>Le {individu.deces.date} &agrave; {individu.deces.lieu}</Typography></Typography>
      </TimelineContent>
    </TimelineItem>
  </Timeline>;
}
