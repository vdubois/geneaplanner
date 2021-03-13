import React from "react";
import {Rubrique} from "./Rubrique";
import './Accueil.css';
import RubriqueOrganisationDesRecherches from './RubriqueOrganisationDesRecherches2.jpg';
import RubriquePreparationPassageAuxArchives from './RubriquePreparationPassageAuxArchives2.jpg';
import RubriqueRechercheDIndividus from './RubriqueRechercheDIndividus.jpg';
import RubriqueImportGedcom from './RubriqueImportGedcom.jpg';
import RubriqueApportDeCorrections from './RubriqueApportDeCorrections.jpeg';
import { useHistory } from "react-router-dom";

export const Accueil = () => {
    const history = useHistory();
    return (
        <div className="Accueil">
            <Rubrique
                titre="Organisation de vos recherches"
                description="Priorisez et organisez vos activités de recherche dans cette rubrique"
                image={RubriqueOrganisationDesRecherches}
            />
            <Rubrique
                titre="Apporter des corrections"
                description="Dans cette rubrique, notez des corrections à apporter à votre généalogie pour les réaliser plus tard"
                image={RubriqueApportDeCorrections}
                onClick={() => history.push('/apport-de-corrections')}
            />
            <Rubrique
                titre="Préparer votre passage aux archives"
                description="Dans cette rubrique, recensez tous les registres que vous souhaitez consulter lors de vos déplacements aux archives départementales"
                image={RubriquePreparationPassageAuxArchives}
            />
            <Rubrique
                titre="Recherche d'individus"
                description="Consultez les fiches détaillées des individus de votre arbre généalogique dans cette rubrique"
                image={RubriqueRechercheDIndividus}
            />
            <Rubrique
                titre="Importer un fichier GEDCOM"
                description="Importez un fichier GEDCOM afin de renseigner votre arbre généalogique"
                image={RubriqueImportGedcom}
                onClick={() => history.push('/importer-un-fichier-gedcom')}
                actionPrimaire={{
                   titre: 'Importer un fichier',
                   onClick: () => {}
                }}
            />
        </div>
    );
}
