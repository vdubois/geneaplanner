import {Box, Container} from "@mui/material";
import React from "react";
import './Profil.css';
import {ConfigurationGitlab} from "./ConfigurationGitlab";
import {ConfigurationDeLArbre} from "./ConfigurationDeLArbre";
import {useAuth0} from "@auth0/auth0-react";
import {useIndividus} from "../api/arbres.hooks";

export const Profil = () => {
    const {isAuthenticated} = useAuth0();
    const {arbre} = useIndividus(isAuthenticated);

    return <Container maxWidth="lg">
        <Box display="flex" flexDirection="column" gap="40px">
            <ConfigurationDeLArbre/>
            {arbre && arbre?.individus?.length > 0 && <ConfigurationGitlab/>}
        </Box>
    </Container>;
}