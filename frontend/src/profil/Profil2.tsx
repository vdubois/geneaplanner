import './Profil2.scss';
import {RetourPageAccueil} from "../commun/RetourPageAccueil";
import {Onglets} from "./Onglets";
import {useState} from "react";
import {MotDePasse} from "./mot-de-passe/MotDePasse";
import {ConfigurationDeLArbre2} from "./arbre/ConfigurationDeLArbre2";
import {InformationsPersonnelles} from "./InformationsPersonnelles";
import {useMediaQuery} from "../hooks/useMediaQuery";
import {breakpoints} from "../index";

export const Profil2 = () => {
    const [ongletActif, setOngletActif] = useState(1);
    const isSmallResolution = useMediaQuery(`(max-width: ${breakpoints.sm}px)`)
    const isGreaterThanSmallResolution = useMediaQuery(`(min-width: ${breakpoints.sm}px)`);

    const onglets = [
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
        }
    ];

    return <>
        <main>
            {isGreaterThanSmallResolution && <div className="d-flex flex-column align-items-center gap-2">
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
            </div>}
            {isSmallResolution && <div id='profil-entete' className="d-flex flex-column align-items-center gap-5">
                <RetourPageAccueil/>
                <InformationsPersonnelles/>
                <MotDePasse/>
                <ConfigurationDeLArbre2/>
            </div>}
        </main>
    </>
}
