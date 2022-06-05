import {Autocomplete, Button, TextField} from "@mui/material";
import React, {useState} from "react";

export const SelectionRacine = ({individus, racineSelectionnee}) => {
    const [racine, setRacine] = useState(null);
    return <>
        <Autocomplete
            id="individu-racine"
            options={individus}
            getOptionLabel={individu => individu ? `${individu.nom} (${individu.id})` : ''}
            noOptionsText="Aucun individu ne correspond"
            disablePortal
            clearText="Effacer"
            sx={{
                width: 500
            }}
            onChange={(event, value) => setRacine(value)}
            renderInput={(params) => <TextField
                {...params}
                autoFocus
                label="Individu racine *"
                variant="outlined"
            />}
        />
        <Button
            disabled={!racine}
            variant="contained"
            sx={{width: 140}}
            onClick={() => racineSelectionnee(racine)}
        >Enregistrer</Button>
    </>
};