import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Button,
    Chip,
    CircularProgress,
    Divider
} from "@material-ui/core";
import {ExpandMore} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import {couleurRaison, texteRaison} from "./raisons";
import React, {useState} from "react";
import {useStyles} from "../useStyles";
import {useValiderCorrection} from "../api/corrections.hooks";
import {Erreur} from "../components/Erreur";

export const Correction = ({correction}) => {
    const classes = useStyles();
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
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore/>}
                aria-controls="panel1c-content"
                id="panel1c-header"
            >
                <div className={classes.accordionColumn}>
                    <Typography className={classes.accordionHeading}>{correction.individu.nom}</Typography>
                </div>
                <div className={classes.accordionColumn}>
                    <Chip
                        color="primary"
                        label={texteRaison(correction.raison)}
                        style={{ backgroundColor: couleurRaison(correction.raison) }}/>
                </div>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
                <div className={classes.accordionColumn}>{correction.description}</div>
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
