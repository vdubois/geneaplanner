import React, {useEffect, useState} from 'react';
import './App.scss';
import {Route, Routes, useNavigate} from "react-router-dom";
import {Bandeau} from "./commun/Bandeau";
import {useAuth0} from "@auth0/auth0-react";
import {Profil2} from "./profil/Profil2";
import {ImportationDeFichierGedcom} from "./importer-un-fichier-gedcom/ImportationDeFichierGedcom";
import {useInformationsPersonnelles, useModifierInformationsPersonnelles} from "./api/informationsPersonnelles.hooks";
import {Loader} from "./components/loader/Loader";
import {Modal} from "./components/modal/Modal";
import {tailleInput} from "./commun/tailleInput";
import 'animate.css';
import {Checkmark} from "./components/Checkmark";

export const App2 = () => {
    const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
    const {enCoursDeChargement, enErreur, informationsPersonnelles} = useInformationsPersonnelles();
    const [renseignerLesInformationsPersonnelles, setRenseignerLesInformationsPersonnelles] = useState(false);
    const modifierInformationsPersonnelles = useModifierInformationsPersonnelles();
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [afficherSucces, setAfficherSucces] = useState(false);
    const navigateTo = useNavigate();

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            loginWithRedirect();
        }
    });

    useEffect(() => {
        if (!isLoading && !enCoursDeChargement && !informationsPersonnelles?.nom && !informationsPersonnelles?.prenom) {
            setRenseignerLesInformationsPersonnelles(true);
        }
    }, [isLoading, enCoursDeChargement, informationsPersonnelles]);

    useEffect(() => {
        if (renseignerLesInformationsPersonnelles) {
            document.getElementById('nom').focus();
        }
    }, [renseignerLesInformationsPersonnelles])

    const enregistrer = async () => {
        try {
            await modifierInformationsPersonnelles({
                nom: 'DURAND',
                prenom: 'David'
            });
            setAfficherSucces(true);
        } catch (e) {
            console.error(e)
        }
    };

    return (
        <>
            {(isLoading || enCoursDeChargement) && <div className='d-flex justify-content-center align-items-center' style={{width: '100%', height: '100vh'}}><Loader/></div>}
            {!isLoading && !enCoursDeChargement && <>
                {!informationsPersonnelles?.nom && !informationsPersonnelles?.prenom && <Bandeau
                    meDeconnecter={() => logout()}
                    retournerVersLaPageDAccueil={() => navigateTo('/')}
                    prenom={user?.given_name ? user?.given_name : user?.name}
                    nomComplet={user?.name}
                    accederAuProfil={() => navigateTo('/profil')}
                />}
                {informationsPersonnelles?.nom && informationsPersonnelles?.prenom && <Bandeau
                    meDeconnecter={() => logout()}
                    retournerVersLaPageDAccueil={() => navigateTo('/')}
                    prenom={informationsPersonnelles.prenom}
                    nomComplet={informationsPersonnelles.prenom + ' ' + informationsPersonnelles.nom}
                    accederAuProfil={() => navigateTo('/profil')}
                />}
            </>}
            {renseignerLesInformationsPersonnelles && <Modal
                titre='Bienvenue !'
                actionDisabled={!nom || !prenom}
                setIsOpen={setRenseignerLesInformationsPersonnelles}
                action={enregistrer}
                canClose={false}
                animation='zoomIn'
            >
                <div className="d-flex flex-column gap-1 personnelles">
                    <h3 className='texte-principale-4 mb-2'>Afin de personnaliser au mieux votre exp&eacute;rience, veuillez tout d'abord renseigner vos informations personnelles :</h3>
                    <div className='d-flex flex-column align-items-center gap-1'>
                        <div className='d-flex flex-column gap-1'>
                            <span className='libelle-champ'>Nom<span className='texte-danger'>&#160;*</span></span>
                            <input
                                id='nom'
                                type='text'
                                style={{width: tailleInput('400px')}}
                                value={nom}
                                autoComplete='new-password'
                                onChange={(event) => setNom(event.target.value)}
                            />
                        </div>
                        <div className='d-flex flex-column gap-1 mb-1'>
                            <span className='libelle-champ'>Pr&eacute;nom<span className='texte-danger'>&#160;*</span></span>
                            <input
                                id='prenom'
                                type='text'
                                style={{width: tailleInput('400px')}}
                                value={prenom}
                                autoComplete='new-password'
                                onChange={(event) => setPrenom(event.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </Modal>}
            {afficherSucces && <Modal
                titre='Merci !'
                variant='close'
                setIsOpen={setAfficherSucces}
            >
                <div className='d-flex flex-column align-items-center gap-2'>
                    <Checkmark/>
                    <h3 className='texte-principale-4 texte-centre mb-1'>Vos informations ont &eacute;t&eacute; prises en compte, vous pouvez d&egrave;s &agrave; pr&eacute;sent profiter des fonctionnalit&eacute;s de G&eacute;n&eacute;aplanner.</h3>
                </div>
            </Modal>}
            <Routes>
                <Route exact path="/" element={<></>}/>
                <Route exact path="/accueil" element={<></>}/>
                <Route exact path="/profil" element={<Profil2 />}/>
                <Route exact path="/importer-un-fichier-gedcom" element={<ImportationDeFichierGedcom />}/>
            </Routes>
        </>
    );
}
