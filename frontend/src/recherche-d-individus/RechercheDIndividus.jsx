import {Autocomplete, Box, Container, Skeleton, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import './RechercheDIndividus.css';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import jwt_decode from "jwt-decode";
import {BACKEND_URL} from "../api/api";
import {Arbre} from "./Arbre";
import {OngletsArbre} from "./OngletsArbre";
import {useIndividus} from "../api/arbres.hooks";

export const RechercheDIndividus = () => {
    const {getAccessTokenSilently, isAuthenticated} = useAuth0();

    let {racine} = useParams();
    const location = useLocation();
    const navigateTo = useNavigate();
    const [arbreGenealogique, setArbreGenealogique] = useState(null);
    const [nomRacine, setNomRacine] = useState(null);
    const [arbreEnCoursDeChargement, setArbreEnCoursDeChargement] = useState(false);
    const [choixEnCours, setChoixEnCours] = useState(false);
    const {arbre} = useIndividus(isAuthenticated);

    useEffect(() => {
        if (arbreGenealogique?.length > 0) {
            setNomRacine(arbreGenealogique.find(individu => individu.id === racine).name);
        }
    }, [arbreGenealogique]);

    useEffect(() => {
        setChoixEnCours(false);
        setArbreEnCoursDeChargement(true);
        setArbreGenealogique(null);
        const fetchArbre = async () => {
            const CHAMP_EMAIL_TOKEN_AUTH0 = 'https://geneaplanner/email';
            const token = await getAccessTokenSilently();
            const accessToken = jwt_decode(token);
            const response = await fetch(
                `${BACKEND_URL}/arbres/${accessToken[CHAMP_EMAIL_TOKEN_AUTH0]}/detail/@${racine}@`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            if (!response.ok) {
                throw new Error(response.json());
            }
            setArbreEnCoursDeChargement(false);
            setArbreGenealogique(await response.json());
        }
        fetchArbre();
    }, [racine, location]);

    const Titre = () => {
        if (choixEnCours) {
            return <Box display="flex" alignItems="center">
                <Typography
                    variant="h4"
                    sx={{textAlign: 'center', marginTop: '40px', marginBottom: '40px', marginRight: '20px'}}>
                    Arbre généalogique de</Typography>
                <Autocomplete
                    margin="dense"
                    options={arbre?.individus}
                    getOptionLabel={individu => individu ? `${individu.nom} (${individu.id})` : ''}
                    noOptionsText="Aucun individu ne correspond"
                    fullWidth
                    clearText="Effacer"
                    onChange={(event, value) => {
                        setChoixEnCours(false);
                        setArbreGenealogique(null);
                        navigateTo(`/recherche-d-individus/${value.id}`);
                    }}
                    renderInput={(params) => <TextField
                        {...params}
                        autoFocus
                        label="Individu *"
                        variant="outlined"
                    />}
                    sx={{width: '500px'}}
                />
            </Box>
        } else {
            return <Typography
                variant="h4"
                onClick={() => setChoixEnCours(true)}
                sx={{textAlign: 'center', margin: '40px', cursor: 'pointer'}}>
                Arbre généalogique de {nomRacine}</Typography>
        }
    }
    return <Container maxWidth="lg">
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{width: '100%'}}>
            {arbreEnCoursDeChargement && <Skeleton height={80} width={600} sx={{margin: '40px'}} />}
            {!arbreEnCoursDeChargement && nomRacine && <Titre/>}
            <Box display="flex" sx={{width: '100%'}}>
                {arbreGenealogique && <Arbre
                    arbreGenealogique={arbreGenealogique}
                    racine={racine}
                />}
                <OngletsArbre individu={racine} />
            </Box>
        </Box>
    </Container>;
}
