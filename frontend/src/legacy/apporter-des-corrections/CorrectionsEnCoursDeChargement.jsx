import {CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

export const CorrectionsEnCoursDeChargement = () => {
    return <div className="CorrectionsEnCoursDeChargement">
        <CircularProgress />
        <Typography variant="body1">Chargement des corrections en cours...</Typography>
    </div>
}
