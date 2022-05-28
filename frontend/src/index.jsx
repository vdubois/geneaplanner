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

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <ThemeProvider theme={theme}>
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri="http://localhost:3000"
            audience={audience}
        >
            <FetchProvider>
                <QueryClientProvider client={queryClient}>
                    <Router>
                        <App/>
                    </Router>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </FetchProvider>
        </Auth0Provider>
    </ThemeProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
