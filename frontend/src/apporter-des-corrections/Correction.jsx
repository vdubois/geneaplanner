import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  CircularProgress,
  Divider
} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import {couleurRaison, texteRaison} from "./raisons";
import React, {useState} from "react";
import {useValiderCorrection} from "../api/corrections.hooks";
import {Erreur} from "../components/Erreur";
import {styled} from "@mui/material/styles";

export const Correction = ({correction}) => {
    const validerCorrection = useValiderCorrection(correction.identifiant);
    const [enCoursDeValidation, setEnCoursDeValidation] = useState(false);
    const [erreur, setErreur] = useState();
    const validerLaCorrection = async () => {
        try {
            setEnCoursDeValidation(true);
            await validerCorrection();
        } catch (erreur) {
            setErreur(erreur.message);
        } finally {
            setEnCoursDeValidation(false);
        }
    }
    const AccordionColumn = styled('div')({
        flexBasis: '50%'
    });
    const AccordionTitle = styled(Typography)(({theme}) => ({
        fontSize: theme.typography.pxToRem(15)
    }));
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore/>}
                aria-controls="panel1c-content"
                id="panel1c-header"
            >
                <AccordionColumn>
                    <AccordionTitle>{correction.individu.nom}</AccordionTitle>
                </AccordionColumn>
                <AccordionColumn>
                    <Chip
                        color="primary"
                        label={texteRaison(correction.raison)}
                        style={{ backgroundColor: couleurRaison(correction.raison) }}/>
                </AccordionColumn>
            </AccordionSummary>
            <AccordionDetails>
                <div style={{flexBasis: '100% !important'}}>{correction.description}</div>
            </AccordionDetails>
            <Divider/>
            <AccordionActions>
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    disabled={enCoursDeValidation}
                    onClick={validerLaCorrection}
                >
                    {enCoursDeValidation ? <CircularProgress size={22} /> : 'Valider'}
                </Button>
            </AccordionActions>
            {erreur && <Erreur message={erreur} />}
        </Accordion>
    );
}
