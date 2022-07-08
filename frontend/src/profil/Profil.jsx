import {Box, Container, Tab, Tabs} from "@mui/material";
import React, {useEffect, useState} from "react";
import './Profil.css';
import {ConfigurationGitlab} from "./stockage-des-documents/ConfigurationGitlab";
import {ConfigurationDeLArbre} from "./arbre/ConfigurationDeLArbre";
import {useAuth0} from "@auth0/auth0-react";
import {useIndividus} from "../api/arbres.hooks";
import {TabContext, TabPanel} from "@mui/lab";
import Typography from "@mui/material/Typography";
import {ConfigurationGoogleMaps} from "./api-google-maps/ConfigurationGoogleMaps";
import {Archives} from "./archives/Archives";
import {isAdmin} from "../auth0";

export const Profil = () => {
    const {isAuthenticated, user} = useAuth0();
    const {arbre} = useIndividus(isAuthenticated);
    const [value, setValue] = useState("1");
    const [userAdmin, setUserAdmin] = useState(false);

    useEffect(() => {
        if (user) {
            setUserAdmin(isAdmin(user));
        }
    }, [user]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <Container maxWidth="md">
        <Box display="flex" flexDirection="column">
            {user?.name && <Typography variant="h4" className="ProfilTitre">Profil de {user.name}</Typography>}
            <TabContext value={value}>
                <Box display="flex" flexDirection="column" sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Arbre" value="1" />
                        {arbre && arbre?.individus?.length > 0 && <Tab label="Stockage des documents" value="2" />}
                        <Tab label="API Google Maps" value="3" />
                        {userAdmin && <Tab label="Archives" value="4" />}
                    </Tabs>
                </Box>
                <TabPanel value="1">
                    <ConfigurationDeLArbre/>
                </TabPanel>
                {arbre && arbre?.individus?.length > 0 && <TabPanel value="2">
                    <ConfigurationGitlab/>
                </TabPanel>}
                <TabPanel value="3">
                    <ConfigurationGoogleMaps />
                </TabPanel>
                {userAdmin && <TabPanel value="4">
                    <Archives />
                </TabPanel>}
            </TabContext>
        </Box>
    </Container>;
}