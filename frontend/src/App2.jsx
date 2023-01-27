import React, {useEffect} from 'react';
import './App.scss';
import {Route, Routes, useNavigate} from "react-router-dom";
import {Bandeau} from "./commun/Bandeau";
import {useAuth0} from "@auth0/auth0-react";
import {Profil2} from "./profil/Profil2";

export const App2 = () => {
    const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
    const navigateTo = useNavigate();
    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            loginWithRedirect();
        }
    });
    return (
        <>
            <Bandeau
                meDeconnecter={() => logout()}
                retournerVersLaPageDAccueil={() => navigateTo('/')}
                prenom={user?.given_name ? user?.given_name : user?.name}
                nomComplet={user?.name}
                accederAuProfil={() => navigateTo('/profil')}
            />
            <Routes>
                <Route exact path="/" element={<></>}/>
                <Route exact path="/accueil" element={<></>}/>
                <Route exact path="/profil" element={<Profil2 />}/>
            </Routes>
        </>
    );
}
