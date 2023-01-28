import {dateAsString} from "../../dates";
import React, {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {useIndividus, useSupprimerLArbre} from "../../api/arbres.hooks";
import {useNavigate} from "react-router-dom";
import {Bouton} from "../../components/Bouton";
import './ConfigurationDeLArbre.scss';
import {Loader} from "../../components/Loader";
import {Modal} from "../../components/Modal";

export const ConfigurationDeLArbre2 = () => {
    const {isAuthenticated, user, isLoading} = useAuth0();
    const {arbre, individusEnCoursDeChargement} = useIndividus(isAuthenticated);
    const supprimerLArbre = useSupprimerLArbre();
    const [recharger, setRecharger] = useState(false);
    const navigateTo = useNavigate();
    const [fenetreDeConfirmationDeSuppressionOuverte, setFenetreDeConfirmationDeSuppressionOuverte] = useState(false);
    const supprimerLArbreEtRecharger = () => {
        supprimerLArbre();
        setRecharger(true);
    }

    useEffect(() => {
        setRecharger(false);
    }, [arbre]);

    return <>
        {(isLoading || individusEnCoursDeChargement || recharger) && <Loader/>}
        {!(isLoading || individusEnCoursDeChargement || recharger) && arbre && arbre?.individus?.length > 0 && <div id="formulaire" className="d-flex flex-column">
            <div className="d-flex flex-column gap-1 suppression-arbre">
                <h3 className='texte-danger'>Supprimer cet arbre</h3>
                <span>Votre arbre généalogique : <strong>{arbre.individus.length} individus</strong>, dernière mise à jour <strong>{dateAsString(arbre.date)}</strong>.</span>
                <span>Cette action supprimera votre arbre. <strong>Il n'y a pas de retour possible</strong>.</span>
                <Bouton
                    variante='danger'
                    libelle='Supprimer mon arbre'
                    taille='200px'
                    onClick={() => setFenetreDeConfirmationDeSuppressionOuverte(true)}/>
            </div>
        </div>}
        {!(isLoading || individusEnCoursDeChargement || recharger) && arbre && arbre?.individus?.length === 0 && <div id="formulaire" className="d-flex">
            <Bouton
                libelle='Importer votre arbre au format GEDCOM'
                variante='secondaire'
                onClick={() => navigateTo('/importer-un-fichier-gedcom')}/>
        </div>}
        {fenetreDeConfirmationDeSuppressionOuverte && <Modal
            titre='Confirmer la suppression'
            contenu='&Ecirc;tes-vous s&ucirc;r(e) de vouloir supprimer votre arbre ?<br/>Les donn&eacute;es rattach&eacute;es pourraient ne plus &ecirc;tre exploitables.'
            setIsOpen={setFenetreDeConfirmationDeSuppressionOuverte}
            action={supprimerLArbreEtRecharger}
        />}
    </>
}
