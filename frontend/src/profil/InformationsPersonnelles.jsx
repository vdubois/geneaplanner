import {Bouton} from "../components/bouton/Bouton";
import {useEffect, useState} from "react";
import './InformationsPersonnelles.scss';
import {Input} from "../components/input/Input";
import {useAuth0} from "@auth0/auth0-react";
import {Loader} from "../components/loader/Loader";
import axios from "axios";
import {domain} from "../auth0";

export const InformationsPersonnelles = () => {
    const {isLoading, user, getAccessTokenSilently, } = useAuth0();
    const [enCoursDeModification, setEnCoursDeModification] = useState(false);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [formulaireValide, setFormulaireValide] = useState(false);

    const mettreAJour = async () => {
        setEnCoursDeModification(false);
    }

    useEffect(() => {
        if (enCoursDeModification) {
            document.getElementById('nom').focus();
        }
    }, [enCoursDeModification])

    useEffect(() => {
        if (user?.family_name) {
            setNom(user.family_name);
        }
        if (user?.given_name) {
            setPrenom(user.given_name);
        }
        setFormulaireValide(nom?.trim() !== '' && prenom?.trim() !== '');
    }, [user]);

    useEffect(() => {
        setFormulaireValide(nom?.trim() !== '' && prenom?.trim() !== '');
    }, [nom, prenom]);

    return <>
        {isLoading && <Loader/>}
        {!isLoading && <div className="d-flex flex-column gap-1 personnelles">
            <div className='d-flex flex-column gap-1'>
                <span className='libelle-champ'>Nom<span className='texte-danger'>&#160;*</span></span>
                <Input
                    id='nom'
                    taille='350px'
                    value={nom}
                    disabled={!enCoursDeModification}
                    onChange={(event) => setNom(event.target.value)}
                />
            </div>
            <div className='d-flex flex-column gap-1'>
                <span className='libelle-champ'>Pr&eacute;nom<span className='texte-danger'>&#160;*</span></span>
                <Input
                    id='prenom'
                    taille='350px'
                    value={prenom}
                    disabled={!enCoursDeModification}
                    onChange={(event) => setPrenom(event.target.value)}
                />
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
                    disabled={!formulaireValide}
                    onClick={mettreAJour}
                    libelle='Valider'/>
                <Bouton
                    id="annuler-informations-personnelles"
                    onClick={() => {
                        setEnCoursDeModification(false);
                        setNom(user?.family_name || '');
                        setPrenom(user?.given_name || '');
                    }}
                    variante='secondaire'
                    libelle='Annuler'/>
            </div>}
        </div>}
    </>;
}
