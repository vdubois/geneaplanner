import {Bouton} from "../components/Bouton";
import {useState} from "react";
import './InformationsPersonnelles.scss';

export const InformationsPersonnelles = () => {
    const [enCoursDeModification, setEnCoursDeModification] = useState(false);

    const mettreAJour = () => {
        setEnCoursDeModification(false);
    }

    return <div className="personnelles">
        <span className="titre">Informations personnelles</span>

        <form className="form-de-mis-a-jour">

            <Bouton id="mettre-a-jour-informations-personnelles"
                onClick={() => setEnCoursDeModification(true)}
                libelle='Modifier mes informations personnelles'/>

            {enCoursDeModification && <div className="actions-edition">
                <Bouton id="valider-informations-personnelles" disabled="formulaireInvalide" onClick={mettreAJour} libelle='Valider'/>
                <Bouton id="annuler-informations-personnelles" onClick={() => setEnCoursDeModification(false)} libelle='Annuler'/>
            </div>}
        </form>
    </div>;
}
