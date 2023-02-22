import React, {useEffect, useState} from "react";
import {Alert, Snackbar} from "@mui/material";

interface MessageProps {
    message: string;
    setMessage: (message: string) => void;
}

export const Erreur = ({message, setMessage}: MessageProps) => {
    const [affichee, setAffichee] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setAffichee(false)
            setMessage('');
        }, 6000);
    }, [affichee, setAffichee])
    return <Snackbar open={affichee}>
        <Alert
            severity="error"
            onClose={() => {
                setAffichee(false);
                setMessage('')
            }}
            variant="filled"
        >
            {message}
        </Alert>
    </Snackbar>
};
