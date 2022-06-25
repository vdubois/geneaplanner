import {Box, CircularProgress} from "@mui/material";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import './RepartitionGeographique.css';
import {useIndividu} from "../api/arbres.hooks";
import {useEffect, useState} from "react";
import {dateAsString} from "../dates";
import {useParametrageGoogleMapsApiKey} from "../api/googlemaps.hooks";

export const RepartitionGeographique = ({identifiantIndividu}) => {
    let {individu} = useIndividu(identifiantIndividu);
    const {apiKeyEnCoursDeChargement, apiKey} = useParametrageGoogleMapsApiKey();
    const [lieux, setLieux] = useState([]);

    const recupererLatitudeLongitude = async (lieu) => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${lieu}&key=${apiKey.googleMapsApiKey}`);
        if (!response.ok) {
            throw new Error(await response.json());
        }
        const donneesGeographiques = await response.json();
        if (donneesGeographiques.status !== 'OK') {
            throw new Error(JSON.stringify(donneesGeographiques));
        }
        return [donneesGeographiques.results[0].geometry.location.lat, donneesGeographiques.results[0].geometry.location.lng];
    };

    const contenuMarqueur = (evenement) => {
        switch (evenement.type) {
            case 'bapteme':
                return `Baptisé(e) le ${dateAsString(evenement.date)} à ${evenement.lieu}`;
            case 'naissance':
                return `Né(e) le ${dateAsString(evenement.date)} à ${evenement.lieu}`;
            case 'fiancailles':
                return `Fiancé(e) le ${dateAsString(evenement.date)} à ${evenement.lieu}`;
            case 'mariage':
                return `Marié(e) le ${dateAsString(evenement.date)} à ${evenement.lieu}`;
            case 'deces':
                return `Décédé(e) le ${dateAsString(evenement.date)} à ${evenement.lieu}`;
        }
    }

    const contenuMarqueurs = (evenementsAgreges) => {
        return evenementsAgreges
            .map(evenement => contenuMarqueur(evenement))
            .join(', ');
    }

    useEffect(() => {
        const fetchLieux = async () => {
            const evenements = {
                bapteme: individu.hasOwnProperty('bapteme') ? individu.bapteme : undefined,
                naissance: individu.hasOwnProperty('naissance') ? individu.naissance : undefined,
                fiancailles: individu.hasOwnProperty('fiancailles') ? individu.fiancailles : undefined,
                mariage: individu.hasOwnProperty('mariage') ? individu.mariage : undefined,
                deces: individu.hasOwnProperty('deces') ? individu.deces : undefined,
            };
            const evenementsRenseignes = {};
            Object.keys(evenements)
                .filter(key => evenements[key]?.lieu)
                .forEach(cleEvenement => evenementsRenseignes[cleEvenement] = evenements[cleEvenement]);
            const lieuxRecuperes = [];
            for (let cleEvenement of Object.keys(evenementsRenseignes)) {
                if (evenementsRenseignes[cleEvenement]) {
                    const latitudeLongitude = await recupererLatitudeLongitude(evenementsRenseignes[cleEvenement].lieu);
                    lieuxRecuperes.push({
                        type: cleEvenement,
                        date: evenementsRenseignes[cleEvenement].date,
                        lieu: evenementsRenseignes[cleEvenement].lieu,
                        latitudeLongitude
                    });
                }
            }
            const evenementsAgreges = lieuxRecuperes.reduce((precedent, courant) => {
                const latitudeLongitude = courant.latitudeLongitude.join();
                if (precedent[latitudeLongitude]) {
                    precedent[latitudeLongitude].push(courant)
                    return precedent;
                } else {
                    precedent[latitudeLongitude] = [courant];
                    return precedent;
                }
            }, []);
            return evenementsAgreges;
        };
        if (apiKey?.googleMapsApiKey) {
            fetchLieux()
                .then(lieuxTrouves => setLieux(lieuxTrouves));
        }
    }, [individu, apiKey]);

    const apiKeyAbsente = !apiKeyEnCoursDeChargement
        && apiKey
        && !apiKey.googleMapsApiKey;

    const apiKeyPresente = !apiKeyEnCoursDeChargement
        && apiKey
        && apiKey.googleMapsApiKey;

    const styleConteneurCarte = {
        flex: 1
    };
    if (apiKeyPresente) {
        styleConteneurCarte.height = '500px';
        styleConteneurCarte.width = '500px';
    }

    const position = [44.802614, -0.588054];
    return <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" sx={styleConteneurCarte}>
        {apiKeyEnCoursDeChargement && <CircularProgress />}
        {apiKeyAbsente && <span>Vous devez définir la clé d'API Google dans Profil > API Google Maps</span>}
        {apiKeyPresente && Object.keys(lieux).length > 0 && <MapContainer center={position} zoom={9} scrollWheelZoom>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {Object.keys(lieux).map((lieu, index) => (<Marker key={"marker-" + index} position={lieux[lieu][0].latitudeLongitude}>
                <Popup>
                    {contenuMarqueurs(lieux[lieu])}
                </Popup>
            </Marker>))}
        </MapContainer>}
    </Box>;
}