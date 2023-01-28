import {dateAsString} from "../../dates";
import React, {useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {useIndividus, useSupprimerLArbre} from "../../api/arbres.hooks";
import {useNavigate} from "react-router-dom";
import {Bouton} from "../../components/Bouton";

export const ConfigurationDeLArbre2 = () => {
    const {isAuthenticated, user} = useAuth0();
    const {arbre} = useIndividus(isAuthenticated);
    const supprimerLArbre = useSupprimerLArbre();
    const navigateTo = useNavigate();
    const [fenetreDeConfirmationDeSuppressionOuverte, setFenetreDeConfirmationDeSuppressionOuverte] = useState(false);

    return <>
        {arbre && arbre?.individus?.length > 0 && <div id="formulaire" className="d-flex flex-column">
            <div className="d-flex align-items-center gap-1">
                <span>Votre arbre généalogique : {arbre.individus.length} individus, dernière mise à jour le {dateAsString(arbre.date)}</span>
                <Bouton
                    libelle='Supprimer'
                    onClick={() => setFenetreDeConfirmationDeSuppressionOuverte(true)}/>
            </div>
        </div>}
        {arbre && arbre?.individus?.length === 0 && <div id="formulaire" className="d-flex">
            <Bouton
                libelle='Importer votre arbre au format GEDCOM'
                onClick={() => navigateTo('/importer-un-fichier-gedcom')}/>
        </div>}
    </>
}
