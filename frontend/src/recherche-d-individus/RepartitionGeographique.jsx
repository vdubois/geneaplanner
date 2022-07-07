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
        if (evenement.date) {
            switch (evenement.type) {
                case 'bapteme':
                    return <span key="bapteme">Baptisé{individu?.sexe === 'F' ? 'e' : ''} {dateAsString(evenement.date)} à {evenement.lieu}</span>;
                case 'naissance':
                    return <span key="naissance">Né{individu?.sexe === 'F' ? 'e' : ''} {dateAsString(evenement.date)} à {evenement.lieu}</span>;
                case 'fiancailles':
                    return <span key="fiancailles">Fiancé{individu?.sexe === 'F' ? 'e' : ''} {dateAsString(evenement.date)} à {evenement.lieu}{individu?.fiancailles?.fiance && ` avec ${individu?.fiancailles?.fiance}`}</span>;
                case 'mariage':
                    return <span key="mariage">Marié{individu?.sexe === 'F' ? 'e' : ''} {dateAsString(evenement.date)} à {evenement.lieu}{individu?.mariage?.epouse && ` avec ${individu?.mariage?.epouse}`}</span>;
                case 'deces':
                    return <span key="deces">Décédé{individu?.sexe === 'F' ? 'e' : ''} {dateAsString(evenement.date)} à {evenement.lieu}</span>;
            }
        } else {
            switch (evenement.type) {
                case 'bapteme':
                    return <span key="bapteme">Baptisé{individu?.sexe === 'F' ? 'e' : ''} à {evenement.lieu}</span>;
                case 'naissance':
                    return <span key="naissance">Né{individu?.sexe === 'F' ? 'e' : ''} à {evenement.lieu}</span>;
                case 'fiancailles':
                    return <span key="fiancailles">Fiancé{individu?.sexe === 'F' ? 'e' : ''} à {evenement.lieu}{individu?.fiancailles?.fiance && ` avec ${individu?.fiancailles?.fiance}`}</span>;
                case 'mariage':
                    return <span key="mariage">Marié{individu?.sexe === 'F' ? 'e' : ''} à {evenement.lieu}{individu?.mariage?.epouse && ` avec ${individu?.mariage?.epouse}`}</span>;
                case 'deces':
                    return <span key="deces">Décédé{individu?.sexe === 'F' ? 'e' : ''} à {evenement.lieu}</span>;
            }
        }
    }

    const contenuMarqueurs = (evenementsAgreges) => {
        return <Box display="flex" flexDirection="column" gap="10px">
            {evenementsAgreges.map(evenement => contenuMarqueur(evenement))}
        </Box>
    }

    useEffect(() => {
        const fetchLieux = async () => {
            const evenements = {
                bapteme: individu && individu?.hasOwnProperty('bapteme') ? individu.bapteme : undefined,
                naissance: individu && individu?.hasOwnProperty('naissance') ? individu.naissance : undefined,
                fiancailles: individu && individu?.hasOwnProperty('fiancailles') ? individu.fiancailles : undefined,
                mariage: individu && individu?.hasOwnProperty('mariage') ? individu.mariage : undefined,
                deces: individu && individu?.hasOwnProperty('deces') ? individu.deces : undefined,
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
        {apiKeyPresente && Object.keys(lieux).length > 0 && <MapContainer center={lieux[Object.keys(lieux)[0]][0].latitudeLongitude} zoom={7} scrollWheelZoom>
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