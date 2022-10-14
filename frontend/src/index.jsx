import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from "react-router-dom";
import {App} from "./App";
import {Auth0Provider} from "@auth0/auth0-react";
import {audience, clientId, domain} from './auth0';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {QueryClient, QueryClientProvider,} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import {FetchProvider} from "./api/FetchProvider";
import {StyledEngineProvider} from "@mui/material/styles";
import {TourProvider} from "@reactour/tour";

const theme = createTheme({
    palette: {
        primary: {
            main: '#F46912',
        },
        secondary: {
            main: '#FCB826',
        },
    },
});

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false
        },
        mutations: {
            retry: false
        }
    }
});

const steps = [
    {
        selector: '#rubrique-arbre',
        content: <span>
            <h3>Bienvenue dans Généaplanner !</h3>Il semble que vous n'ayez pas encore importé votre arbre généalogique.
            <br/><br/>Vous devez importer votre arbre au format <strong>GEDCOM</strong> en priorité afin de pouvoir profiter de l'ensemble des fonctionnalités de l'application.
        </span>
    },
    {
        selector: '#rubrique-organisation',
        content: <span>
            <h3>Organisez vos recherches !</h3>Vous êtes quelqu'un d'organisé et vous notez tout. Ne perdez plus de temps à centraliser vos notes dans un cahier ou dans un dossier papier
            que vous pouvez égarer.<br/><br/>Grâce à cette rubrique, retrouvez toutes vos notes de recherche à un seul endroit pour pouvoir revenir plus tard dessus.
        </span>
    },
    {
        selector: '#rubrique-corrections',
        content: <span>
            <h3>Corrigez vos erreurs !</h3>Grâce à cette rubrique, notez les erreurs et incohérences que vous trouvez dans votre arbre généalogique.
            <br/><br/>Vous pourrez ensuite revenir dessus quand vous aurez du temps à y consacrer pour corriger en toute quiétude.
        </span>
    },
    {
        selector: '#rubrique-archives',
        content: <span>
            <h3>Préparez vos visites aux archives départementales !</h3>Les archives départementales sont une source presque inépuisable pour un généalogiste averti.
            <br/><br/>Mais il y a tellement de contenu disponible que c'est très compliqué d'organiser ces visites.
            <br/><br/>Cette rubrique vous permet de préparer vos visites en notant tous les volumes à emprunter et en ordonnançant ces emprunts.
        </span>
    },
    {
        selector: '#rubrique-individus',
        content: <span>
            <h3>Un oubli ?</h3>Consultez dans cette rubrique les fiches détaillées de vos ancêtres.
            <br/><br/>Cette fonctionnalité vous servira de roue de secours si vous n'avez pas votre logiciel de généalogie habituel sous la main.
        </span>
    }
];

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
            <Auth0Provider
                domain={domain}
                clientId={clientId}
                redirectUri="http://localhost:5173"
                audience={audience}
            >
                <FetchProvider>
                    <QueryClientProvider client={queryClient}>
                        <Router>
                            <TourProvider
                                steps={steps}
                                badgeContent={({ totalSteps, currentStep }) =>
                                    `${currentStep + 1}/${totalSteps}`
                                }
                                styles={{ popover: base => ({ ...base, maxWidth: '600px' }) }}
                            >
                                <App/>
                            </TourProvider>
                        </Router>
                        <ReactQueryDevtools initialIsOpen={false} />
                    </QueryClientProvider>
                </FetchProvider>
            </Auth0Provider>
        </ThemeProvider>
    </StyledEngineProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
