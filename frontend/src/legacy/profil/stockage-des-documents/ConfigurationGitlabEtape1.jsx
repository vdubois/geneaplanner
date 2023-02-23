import {FormControl, FormGroup, Skeleton} from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";

export const ConfigurationGitlabEtape1 = ({enCoursDeChargement, host, setHost, token, setToken}) => {
    return <FormGroup sx={{display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px'}}>
        <FormControl variant="outlined">
            {enCoursDeChargement && <Skeleton height={60} />}
            {!enCoursDeChargement && <TextField
                label="Adresse du serveur Gitlab"
                variant="outlined"
                value={host}
                onChange={event => setHost(event.target.value)} />}
        </FormControl>
        <FormControl variant="outlined">
            {enCoursDeChargement && <Skeleton height={60} />}
            {!enCoursDeChargement && <TextField
                label="Token Gitlab"
                variant="outlined"
                value={token}
                onChange={event => setToken(event.target.value)} />}
        </FormControl>
    </FormGroup>
}