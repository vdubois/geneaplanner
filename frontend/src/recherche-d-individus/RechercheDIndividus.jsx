import {Box, Container, Skeleton, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import './RechercheDIndividus.css';
import {useLocation, useParams} from "react-router-dom";
import jwt_decode from "jwt-decode";
import {BACKEND_URL} from "../api/api";
import {Arbre} from "./Arbre";
import {OngletsArbre} from "./OngletsArbre";

export const RechercheDIndividus = () => {
    const {getAccessTokenSilently} = useAuth0();

    let {racine} = useParams();
    const location = useLocation();
    const [arbreGenealogique, setArbreGenealogique] = useState(null);
    const [nomRacine, setNomRacine] = useState(null);
    const [arbreEnCoursDeChargement, setArbreEnCoursDeChargement] = useState(false);

    useEffect(() => {
        if (arbreGenealogique?.length > 0) {
            setNomRacine(arbreGenealogique.find(individu => individu.id === racine).name);
        }
    }, [arbreGenealogique]);

    useEffect(() => {
        setArbreEnCoursDeChargement(true);
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

    return <Container maxWidth="lg">
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{width: '100%'}}>
            {arbreEnCoursDeChargement && <Skeleton height={80} width={600} sx={{margin: '40px'}} />}
            {!arbreEnCoursDeChargement && nomRacine && <Typography
                variant="h4"
                sx={{textAlign: 'center', margin: '40px'}}>Arbre généalogique de {nomRacine}</Typography>}
            <Box display="flex" sx={{width: '100%'}}>
                <Arbre
                    arbreGenealogique={arbreGenealogique}
                    racine={racine}
                />
                <OngletsArbre individu={racine} />
            </Box>
        </Box>
    </Container>;
}
