import {Autocomplete, Button, FormControl, InputLabel, TextField} from "@mui/material";
import React, {useState} from "react";

export const SelectionRacine = ({individus, racineSelectionnee}) => {
    const [racine, setRacine] = useState(null);
    return <>
        <FormControl variant="outlined" className="ChampFenetreDeSaisie" fullWidth sx={{marginBottom: '10px'}}>
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
        </FormControl>
        <Button
            disabled={!racine}
            variant="contained"
            sx={{width: 140, marginBottom: '6px'}}
            onClick={() => racineSelectionnee(racine)}
        >Enregistrer</Button>
    </>
};