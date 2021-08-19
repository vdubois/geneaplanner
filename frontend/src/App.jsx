import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import { useStyles } from "./useStyles";
import { AppMenu } from "./components/AppMenu";
import { BarreDeNavigation } from "./components/BarreDeNavigation";
import { Route, Switch } from "react-router-dom";
import { OrganisationDesRecherches } from "./organiser-les-recherches/OrganisationDesRecherches";
import { PreparationPassageAuxArchives } from "./preparer-passage-aux-archives/PreparationPassageAuxArchives";
import { RechercheDIndividus } from "./recherche-d-individus/RechercheDIndividus";
import { Accueil } from "./accueil/Accueil";
import { ImportationDeFichierGedcom } from "./importer-un-fichier-gedcom/ImportationDeFichierGedcom";
import { ApportDeCorrections } from "./apporter-des-corrections/ApportDeCorrections";
import { FicheDeRecherche } from "./organiser-les-recherches/fiche-de-recherche/FicheDeRecherche";

export const App = () => {
    const classes = useStyles();
    const [menuOuvertEnModeMobile, setMenuOuvertEnModeMobile] = useState(false);

    const basculerMenu = () => {
        setMenuOuvertEnModeMobile(!menuOuvertEnModeMobile);
    };


    return (
        <div className={classes.root}>
            <CssBaseline />
            <BarreDeNavigation
                basculerMenu={basculerMenu} />
            <AppMenu
                menuOuvertEnModeMobile={menuOuvertEnModeMobile}
                basculerMenu={basculerMenu} />
            <main className={classes.content}>
                <div className={classes.toolbar}>
                    <Switch>
                        <Route exact path="/">
                            <Accueil />
                        </Route>
                        <Route exact path="/accueil">
                            <Accueil />
                        </Route>
                        <Route exact path="/organiser-les-recherches">
                            <OrganisationDesRecherches />
                        </Route>
                        <Route exact path="/organiser-les-recherches/:individu">
                            <FicheDeRecherche />
                        </Route>
                        <Route exact path="/apporter-des-corrections">
                            <ApportDeCorrections/>
                        </Route>
                        <Route exact path="/preparer-passage-aux-archives">
                            <PreparationPassageAuxArchives />
                        </Route>
                        <Route exact path="/recherche-d-individus">
                            <RechercheDIndividus />
                        </Route>
                        <Route exact path="/importer-un-fichier-gedcom">
                            <ImportationDeFichierGedcom />
                        </Route>
                    </Switch>
                </div>
            </main>
        </div>
    );
}

