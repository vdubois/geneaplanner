import SearchIcon from '@mui/icons-material/Search';
import React, {useState} from "react";
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import {callApi} from "../api/api";
import TextField from '@mui/material/TextField';
import {styled} from "@mui/material/styles";


export const Recherche = () => {

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    let declenchementRecherche;

    const Search = styled('div')(({theme}) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 10,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({theme}) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));
    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon/>
            </SearchIconWrapper>
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
                renderOption={(option) => (<div>{option.nom}</div>)}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Recherche…"
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

        </Search>
    )
};
