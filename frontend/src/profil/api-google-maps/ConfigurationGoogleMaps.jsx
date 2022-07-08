import {Alert, Box, Button, FormControl, Skeleton, Snackbar, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useEnregistrerGoogleMapsApiKey, useParametrageGoogleMapsApiKey} from "../../api/googlemaps.hooks";

export const ConfigurationGoogleMaps = () => {
    const [googleMapsApiKey, setGoogleMapsApiKey] = useState('');
    const [apiKeyEnCoursDEnregistrement, setApiKeyEnCoursDEnregistrement] = useState(false);
    const [afficherSucces, setAfficherSucces] = useState(false);

    const {
        apiKeyEnCoursDeChargement,
        apiKey
    } = useParametrageGoogleMapsApiKey();
    const enregistrerApiKey = useEnregistrerGoogleMapsApiKey();

    useEffect(() => {
        if (apiKey?.googleMapsApiKey) {
            setGoogleMapsApiKey(apiKey?.googleMapsApiKey);
        }
    }, [apiKey]);

    const enregistrer = async () => {
        try {
            setApiKeyEnCoursDEnregistrement(true);
            await enregistrerApiKey({
                apiKey: googleMapsApiKey
            });
            setAfficherSucces(true);
        } finally {
            setApiKeyEnCoursDEnregistrement(false);
        }
    };

    const handleClose = () => setAfficherSucces(false);

    return <Box display="flex" flexDirection="column">
        {apiKeyEnCoursDeChargement && <Skeleton height={60} />}
        {!apiKeyEnCoursDeChargement && <FormControl variant="outlined" className="ChampFenetreDeSaisie" fullWidth sx={{marginBottom: '10px'}}>
            <TextField
                label="Clé d'API Google Maps"
                variant="outlined"
                value={googleMapsApiKey}
                onChange={event => setGoogleMapsApiKey(event.target.value)} />
        </FormControl>}
        <Button
            disabled={googleMapsApiKey.trim() === '' || apiKeyEnCoursDEnregistrement}
            variant="contained"
            sx={{width: 140, marginBottom: '6px'}}
            onClick={() => enregistrer()}
        >Enregistrer</Button>
        <Snackbar open={afficherSucces} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                API enregistrée avec succès
            </Alert>
        </Snackbar>
    </Box>;
}