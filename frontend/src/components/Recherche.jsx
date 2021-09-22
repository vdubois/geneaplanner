import {useStyles} from "../useStyles";
import SearchIcon from '@mui/icons-material/Search';
import React, {useState} from "react";
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import {callApi} from "../api/api";
import TextField from '@mui/material/TextField';


export const Recherche = () => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    let declenchementRecherche;

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon/>
            </div>
            <Autocomplete
                id="recherche"
                style={{width: 300}}
                getOptionLabel={(option) => option.nom}
                options={options}
                open={options?.length > 0 ? open : false}
                onClose={() => {
                    setOpen(false);
                    setOptions([]);
                }}
                onOpen={() => setOpen(true)}
                clearText="Effacer"
                renderOption={(option) => (<div data-testid="resultat-recherche">{option.nom}</div>)}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Recherche…"
                        classes={{
                            root: classes.inputAutoComplete,
                        }}
                        onChange={(evenement) => {
                            const motCle = evenement.target.value;
                            if (motCle.length >= 3) {
                                if (declenchementRecherche) {
                                    clearTimeout(declenchementRecherche);
                                }
                                declenchementRecherche = setTimeout(async () => {
                                    setOptions([]);
                                    setOpen(false);
                                    setLoading(true);
                                    const medicaments = await callApi({
                                        endpoint: '/medicaments',
                                        query: "recherche=" + motCle,
                                        method: 'GET'
                                    });
                                    setOpen(true);
                                    setLoading(false);
                                    setOptions(medicaments);

                                }, 500);
                            }
                        }}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="secondary" size={20}/> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />

                )}
            />

        </div>
    )
};
