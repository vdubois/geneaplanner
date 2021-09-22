import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";
import {Add} from "@mui/icons-material";
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
