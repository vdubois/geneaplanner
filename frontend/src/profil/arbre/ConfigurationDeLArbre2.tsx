import {dateAsString} from "../../dates";
import React, {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {useIndividus, useSupprimerLArbre} from "../../api/arbres.hooks";
import {useNavigate} from "react-router-dom";
import {Bouton} from "../../components/bouton/Bouton";
import './ConfigurationDeLArbre.scss';
import {Loader} from "../../components/loader/Loader";
import {Modal} from "../../components/modal/Modal";
import {useMediaQuery} from "../../hooks/useMediaQuery";
import {breakpoints} from "../../index";

export const ConfigurationDeLArbre2 = () => {
    const {isAuthenticated, user, isLoading} = useAuth0();
    const {arbre, individusEnCoursDeChargement} = useIndividus(isAuthenticated);
    const supprimerLArbre = useSupprimerLArbre();
    const [recharger, setRecharger] = useState(false);
    const navigateTo = useNavigate();
    const [fenetreDeConfirmationDeSuppressionOuverte, setFenetreDeConfirmationDeSuppressionOuverte] = useState(false);
    const isSmallResolution = useMediaQuery(`(max-width: ${breakpoints.sm}px)`)

    const supprimerLArbreEtRecharger = async () => {
        // @ts-ignore
        await supprimerLArbre();
        setRecharger(true);
    }

    useEffect(() => {
        setRecharger(false);
    }, [arbre]);

    return <>
        {(isLoading || individusEnCoursDeChargement || recharger) && <Loader/>}
        {!(isLoading || individusEnCoursDeChargement || recharger) && arbre && arbre?.individus?.length > 0 && <div id="formulaire" className="d-flex flex-column align-items-center">
            {isSmallResolution && <h3 className='mb-2 texte-principale-3'>Arbre</h3>}
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
        <Modal
            open={fenetreDeConfirmationDeSuppressionOuverte}
            titre='Confirmer la suppression'
            setIsOpen={setFenetreDeConfirmationDeSuppressionOuverte}
            action={supprimerLArbreEtRecharger}
            animation='zoomIn'
        >
            &Ecirc;tes-vous s&ucirc;r(e) de vouloir supprimer votre arbre ?<br/>Les donn&eacute;es rattach&eacute;es pourraient ne plus &ecirc;tre exploitables.
        </Modal>
    </>
}
