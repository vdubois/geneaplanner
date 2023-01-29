import {Bouton} from "../components/bouton/Bouton";
import {useEffect, useState} from "react";
import './InformationsPersonnelles.scss';
import {Input} from "../components/input/Input";
import {useAuth0} from "@auth0/auth0-react";
import {Loader} from "../components/loader/Loader";

export const InformationsPersonnelles = () => {
    const {isLoading, user} = useAuth0();
    const [enCoursDeModification, setEnCoursDeModification] = useState(false);

    const mettreAJour = () => {
        setEnCoursDeModification(false);
    }

    useEffect(() => {
        if (enCoursDeModification) {
            document.getElementById('nom').focus();
        }
    }, [enCoursDeModification])

    return <>
        {isLoading && <Loader/>}
        {!isLoading && <div className="d-flex flex-column gap-1 personnelles">
            <div className='d-flex flex-column gap-1'>
                <span className='libelle-champ'>Nom</span>
                <Input
                    id='nom'
                    taille='350px'
                    value={user?.family_name}
                    autoFocus={true}
                    disabled={!enCoursDeModification}
                />
            </div>
            <div className='d-flex flex-column gap-1'>
                <span className='libelle-champ'>Pr&eacute;nom</span>
                <Input
                    id='prenom'
                    taille='350px'
                    value={user?.given_name}
                    disabled={!enCoursDeModification}/>
            </div>

            {!enCoursDeModification && <div className="d-flex gap-2 pt-2">
                <Bouton id="mettre-a-jour-informations-personnelles"
                                               onClick={() => setEnCoursDeModification(true)}
                                               variante='secondaire'
                                               taille='340px'
                                               libelle='Modifier mes informations personnelles'/>
            </div>}

            {enCoursDeModification && <div className="d-flex gap-2 pt-2">
                <Bouton id="valider-informations-personnelles"
                        onClick={mettreAJour}
                        libelle='Valider'/>
                <Bouton
                    id="annuler-informations-personnelles"
                    onClick={() => setEnCoursDeModification(false)}
                    variante='secondaire'
                    libelle='Annuler'/>
            </div>}
        </div>}
    </>;
}
