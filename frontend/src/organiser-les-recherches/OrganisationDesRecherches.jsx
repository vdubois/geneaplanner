import Typography from '@material-ui/core/Typography';
import React from 'react';
import './OrganisationDesRecherches.css';
import {Container} from '@material-ui/core';
import {useRecherches} from '../api/recherches.hooks';

export const OrganisationDesRecherches = () => {
    const {recherchesEnCoursDeChargement, recherchesEnErreur, recherches} = useRecherches();

    return <>
        <Container maxWidth="md">
            <Typography variant="h4" className="OrganisationDesRecherchesTitre">Organisation des recherches</Typography>
        </Container>
    </>;
}
