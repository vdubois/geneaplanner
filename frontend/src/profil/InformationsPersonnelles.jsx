import {Bouton} from "../components/bouton/Bouton";
import {useEffect, useState} from "react";
import './InformationsPersonnelles.scss';
import {useAuth0} from "@auth0/auth0-react";
import {Loader} from "../components/loader/Loader";
import {useInformationsPersonnelles, useModifierInformationsPersonnelles} from "../api/informationsPersonnelles.hooks";
import {tailleInput} from "../commun/tailleInput";
import {useMediaQuery} from "@mui/material";

export const InformationsPersonnelles = () => {
    const {isLoading, user} = useAuth0();
    const [enCoursDeModification, setEnCoursDeModification] = useState(false);
    const {enCoursDeChargement, informationsPersonnelles} = useInformationsPersonnelles();
    const enregistrerLaModificationDesInformationsPersonnelles = useModifierInformationsPersonnelles();
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [formulaireValide, setFormulaireValide] = useState(false);
    const isSmallResolution = useMediaQuery('(max-width: 400px)')

    const mettreAJour = async () => {
        await enregistrerLaModificationDesInformationsPersonnelles({
            nom,
            prenom
        })
        setEnCoursDeModification(false);
    }

    useEffect(() => {
        if (enCoursDeModification) {
            document.getElementById('nom').focus();
        }
    }, [enCoursDeModification])

    useEffect(() => {
        setFormulaireValide(nom?.trim() !== '' && prenom?.trim() !== '');
    }, [nom, prenom]);

    useEffect(() => {
        if (informationsPersonnelles?.nom) {
            setNom(informationsPersonnelles.nom);
        } else if (user?.family_name) {
            setNom(user.family_name);
        }
        if (informationsPersonnelles?.prenom) {
            setPrenom(informationsPersonnelles.prenom)
        } else if (user?.given_name) {
            setPrenom(user.given_name);
        }
    }, [informationsPersonnelles, user]);

    return <>
        {(isLoading || enCoursDeChargement) && <Loader/>}
        {!isLoading && !enCoursDeChargement && <div className={"d-flex flex-column gap-1 personnelles" + (isSmallResolution ? ' align-items-center' : '')}>
            {isSmallResolution && <h3 className='mb-2 texte-principale-3'>Informations personnelles</h3>}
            <div className='d-flex flex-column gap-1'>
                <span className='libelle-champ'>Nom<span className='texte-danger'>&#160;*</span></span>
                <input
                    id='nom'
                    type='text'
                    style={{width: tailleInput(isSmallResolution ? '280px' : '350px')}}
                    value={nom}
                    disabled={!enCoursDeModification}
                    onChange={(event) => setNom(event.target.value)}
                    autoComplete='new-password'
                />
            </div>
            <div className='d-flex flex-column gap-1'>
                <span className='libelle-champ'>Pr&eacute;nom<span className='texte-danger'>&#160;*</span></span>
                <input
                    id='prenom'
                    type='text'
                    style={{width: tailleInput(isSmallResolution ? '280px' : '350px')}}
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
                        setNom(informationsPersonnelles?.nom || user?.family_name || '');
                        setPrenom(informationsPersonnelles?.prenom || user?.given_name || '');
                    }}
                    variante='secondaire'
                    libelle='Annuler'/>
            </div>}
        </div>}
    </>;
}
