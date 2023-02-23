import React, {useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import '../App.scss';
import {Route, Routes} from "react-router-dom";
import {OrganisationDesRecherches} from "./organiser-les-recherches/OrganisationDesRecherches";
import {PreparationPassageAuxArchives} from "./preparer-passage-aux-archives/PreparationPassageAuxArchives";
import {RechercheDIndividus} from "./recherche-d-individus/RechercheDIndividus";
import {Accueil} from "./accueil/Accueil";
import {ImportationDeFichierGedcom} from "../importer-un-fichier-gedcom/ImportationDeFichierGedcom";
import {ApportDeCorrections} from "./apporter-des-corrections/ApportDeCorrections";
import {FicheDeRecherche} from "./organiser-les-recherches/fiche-de-recherche/FicheDeRecherche";
import {FicheDArchives} from './preparer-passage-aux-archives/fiche-d-archives/FicheDArchives';
import {styled} from "@mui/material/styles";

export const App = () => {
    const Root = styled('div')(({theme}) => ({
        display: 'flex'
    }));
    const Toolbar = styled('div')(({theme}) => ({
        ...theme.mixins.toolbar,
        display: 'flex',
        justifyContent: 'center'
    }));
    const Content = styled('div')(({theme}) => ({
        flexGrow: 1,
        // padding: theme.spacing(3),
        paddingTop: '84px !important'
    }));
    const [menuOuvertEnModeMobile, setMenuOuvertEnModeMobile] = useState(false);

    const basculerMenu = () => {
        setMenuOuvertEnModeMobile(!menuOuvertEnModeMobile);
    };

    return (
        <Root>
            <CssBaseline />
            <Content>
                <Toolbar>
                    <Routes>
                        <Route exact path="/" element={<Accueil />}/>
                        <Route exact path="/accueil" element={<Accueil />}/>
                        <Route exact path="/organiser-les-recherches" element={<OrganisationDesRecherches />}/>
                        <Route exact path="/organiser-les-recherches/:individu" element={<FicheDeRecherche />}/>
                        <Route exact path="/apporter-des-corrections" element={<ApportDeCorrections/>}/>
                        <Route exact path="/preparer-passage-aux-archives" element={<PreparationPassageAuxArchives />}/>
                        <Route exact path="/preparer-passage-aux-archives/:archive" element={<FicheDArchives />}/>
                        <Route exact path="/recherche-d-individus/:racine" element={<RechercheDIndividus />}/>
                        <Route exact path="/importer-un-fichier-gedcom" element={<ImportationDeFichierGedcom />}/>
                    </Routes>
                </Toolbar>
            </Content>
        </Root>
    );
}

