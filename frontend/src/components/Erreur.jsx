import React, {useEffect, useState} from "react";
import {Alert, Snackbar} from "@mui/material";

export const Erreur = ({message}) => {
    const [affichee, setAffichee] = useState(true);
    useEffect(() => {
        setTimeout(() => setAffichee(false), 6000);
    }, [affichee, setAffichee])
    return <Snackbar open={affichee}>
        <Alert
            severity="error"
            onClose={() => setAffichee(false)}
            variant="filled"
        >
            {message}
        </Alert>
    </Snackbar>
};
