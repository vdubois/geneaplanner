import {CircularProgress} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";

export const CorrectionsEnCoursDeChargement = () => {
    return <div className="CorrectionsEnCoursDeChargement">
        <CircularProgress />
        <Typography variant="body1">Chargement des corrections en cours...</Typography>
    </div>
}
