import './Profil2.scss';
import {RetourPageAccueil} from "../commun/RetourPageAccueil";
import {Onglets} from "./Onglets";
import {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {isAdmin} from "../auth0";
import {MotDePasse} from "./mot-de-passe/MotDePasse";
import {ConfigurationDeLArbre2} from "./arbre/ConfigurationDeLArbre2";
import {InformationsPersonnelles} from "./InformationsPersonnelles";

export const Profil2 = () => {
    const {isAuthenticated, user} = useAuth0();
    const [userAdmin, setUserAdmin] = useState(false);
    const [ongletActif, setOngletActif] = useState(1);

    const [onglets, setOnglets] = useState([
        {
            valeur: 1,
            libelle: 'Informations personnelles'
        },
        {
            valeur: 2,
            libelle: 'Mot de passe'
        },
        {
            valeur: 3,
            libelle: 'Arbre'
        },
        {
            valeur: 4,
            libelle: 'Stockage des documents'
        },
        {
            valeur: 5,
            libelle: 'API Google Maps'
        },
    ]);

    useEffect(() => {
        if (user) {
            const admin = isAdmin(user);
            setUserAdmin(admin);
            const ongletArchives = {
                valeur: 6,
                libelle: 'Archives'
            };
            if (admin && !onglets.some(onglet => onglet.valeur === 6)) {
                setOnglets([...onglets, ongletArchives]);
            }
        }
    }, [user]);


    return <main>
        <div className="d-flex flex-column align-items-center gap-2">
            <div id="profil-entete" className="conteneur-principal d-flex flex-column gap-3 pl-5 pr-5">
                <RetourPageAccueil/>
                <Onglets
                    ongletActif={ongletActif}
                    setOngletActif={setOngletActif}
                    onglets={onglets}
                />
                {ongletActif === 1 && <InformationsPersonnelles/>}
                {ongletActif === 2 && <MotDePasse/>}
                {ongletActif === 3 && <ConfigurationDeLArbre2/>}
            </div>
        </div>
    </main>
}
