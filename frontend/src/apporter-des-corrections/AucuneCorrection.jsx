import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import React from "react";

export const AucuneCorrection = ({setFenetreDeSaisieOuverte}) => {
    return <div className="AucuneCorrection">
        <Typography variant="h6" className="AucuneCorrectionTexte">Vous n'avez aucune correction en cours</Typography>
        <Button
            variant="contained"
            color="primary"
            startIcon={<Add/>}
            onClick={() => setFenetreDeSaisieOuverte(true)}
        >Ajouter</Button>
    </div>;
}
