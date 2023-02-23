import React, {useEffect, useState} from 'react';
import './App.scss';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {Bandeau} from "./commun/Bandeau";
import {useAuth0} from "@auth0/auth0-react";
import {Profil} from "./profil/Profil";
import {ImportationDeFichierGedcom} from "./importer-un-fichier-gedcom/ImportationDeFichierGedcom";
import {useInformationsPersonnelles} from "./api/informationsPersonnelles.hooks";
import {Loader} from "./components/loader/Loader";
import 'animate.css';
import {PremiereConnexion} from "./premiere-connexion/PremiereConnexion";

export const App = () => {
    const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
    const {enCoursDeChargement, informationsPersonnelles} = useInformationsPersonnelles();

    const navigateTo = useNavigate();
    const location = useLocation();
    const [titre, setTitre] = useState('');
    const [nomComplet, setNomComplet] = useState('');

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            loginWithRedirect();
        }
    }, [isAuthenticated, isLoading]);

    useEffect(() => {
        if (location.pathname.includes('/profil')) {
            setTitre('Mes paramètres');
        } else {
            if (!informationsPersonnelles?.nom && !informationsPersonnelles?.prenom) {
                setTitre(`Bonjour ${(!user?.given_name ? user?.given_name : user?.name) || ''} !`);
            } else if (informationsPersonnelles?.nom && informationsPersonnelles?.prenom) {
                setTitre(`Bonjour ${informationsPersonnelles.prenom || ''} !`);
            }
        }
    }, [location, informationsPersonnelles, user]);

    useEffect(() => {
        if (!informationsPersonnelles?.nom && !informationsPersonnelles?.prenom) {
            setNomComplet(user?.name!);
        } else if (informationsPersonnelles?.nom && informationsPersonnelles?.prenom) {
            setNomComplet(informationsPersonnelles.prenom + ' ' + informationsPersonnelles.nom);
        }
    }, [informationsPersonnelles, user]);

    return (
        <>
            <PremiereConnexion/>
            {(isLoading || enCoursDeChargement) && <div className='d-flex justify-content-center align-items-center' style={{width: '100%', height: '100vh'}}><Loader/></div>}
            {!isLoading && !enCoursDeChargement && <>
                <Bandeau
                    meDeconnecter={() => logout()}
                    retournerVersLaPageDAccueil={() => navigateTo('/')}
                    titre={titre}
                    nomComplet={nomComplet}
                    accederAuProfil={() => navigateTo('/profil')}
                />
            </>}
            <Routes>
                <Route path="/" element={<></>}/>
                <Route path="/accueil" element={<></>}/>
                <Route path="/profil" element={<Profil />}/>
                <Route path="/importer-un-fichier-gedcom" element={<ImportationDeFichierGedcom />}/>
            </Routes>
        </>
    );
}
