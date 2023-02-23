import React, {useEffect, useState} from "react";
import {Rubrique} from "./Rubrique";
import './Accueil.css';
import RubriqueOrganisationDesRecherches from './RubriqueOrganisationDesRecherches2.jpg';
import RubriquePreparationPassageAuxArchives from './RubriquePreparationPassageAuxArchives2.jpg';
import RubriqueRechercheDIndividus from './RubriqueRechercheDIndividus.jpg';
import RubriqueImportGedcom from './RubriqueImportGedcom.jpg';
import RubriqueApportDeCorrections from './RubriqueApportDeCorrections.jpeg';
import {useNavigate} from "react-router-dom";
import {useIndividus} from "../../api/arbres.hooks";
import {useAuth0} from "@auth0/auth0-react";
import {
    Badge,
    Button, CircularProgress,
    Container,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton
} from "@mui/material";
import {useRecherches} from "../../api/recherches.hooks";
import {useCorrections} from "../../api/corrections.hooks";
import {useArchives} from "../../api/archives.hooks";
import {dateAsString} from "../../dates";
import {useTour} from "@reactour/tour";
import {useLocalStorage} from "../../hooks/useLocalStorage";
import {SelectionRacine} from "../../importer-un-fichier-gedcom/selection-racine/SelectionRacine";
import {FenetreDeSaisieDeLaRacine} from "./FenetreDeSaisieDeLaRacine";

export const Accueil = () => {
    const navigateTo = useNavigate();
    const {isAuthenticated} = useAuth0();
    const {individusEnCoursDeChargement, individusEnErreur, arbre} = useIndividus(isAuthenticated);
    const {recherchesEnCoursDeChargement, recherchesEnErreur, recherches} = useRecherches(isAuthenticated);
    const {correctionsEnCoursDeChargement, correctionsEnErreur, corrections} = useCorrections(isAuthenticated);
    const {archivesEnCoursDeChargement, archivesEnErreur, archives} = useArchives(isAuthenticated);
    const {setIsOpen} = useTour();
    const [showTour, setShowTour] = useLocalStorage("showTour", false);
    const [fenetreDeSaisieOuverte, setFenetreDeSaisieOuverte] = useState(false);

    useEffect(() => {
        if (arbre?.individus?.length === 0 && !showTour) {
            setShowTour(true);
            setIsOpen(true);
        }
    }, [arbre, showTour]);

    useEffect(() => {
        if (arbre?.racine === '') {
            setFenetreDeSaisieOuverte(true);
        }
    }, [arbre]);

    const RubriqueArbre = () => {
        if (arbre?.individus?.length > 0) {
            return <Badge badgeContent={arbre.individus.length} max={9999} color="primary"><Rubrique
                id='rubrique-arbre'
                titre="Votre arbre g&eacute;n&eacute;alogique"
                description={`Vous avez actuellement ${arbre.individus.length} individus dans votre arbre. Dernière mise à jour le ${dateAsString(arbre.date)}.`}
                image={RubriqueImportGedcom}
                onClick={() => navigateTo('/importer-un-fichier-gedcom')}
                actionPrimaire={{
                    titre: 'Réimporter un fichier',
                    onClick: () => navigateTo('/importer-un-fichier-gedcom')
                }}
            /></Badge>;
        } else {
            return <Rubrique
                id='rubrique-arbre'
                titre="Importer un fichier GEDCOM"
                description="Importez un fichier GEDCOM afin de renseigner votre arbre généalogique"
                image={RubriqueImportGedcom}
                onClick={() => navigateTo('/importer-un-fichier-gedcom')}
                actionPrimaire={{
                    titre: 'Importer un fichier',
                    onClick: () => {
                        setIsOpen(false);
                        navigateTo('/importer-un-fichier-gedcom');
                    }
                }}
            />;
        }
    };

    return (
        <>
            <Container maxWidth="lg" className="Accueil">
                <Badge
                    badgeContent={recherchesEnCoursDeChargement ? '' : (recherches?.recherches && Object.keys(recherches?.recherches).length)}
                    max={9999} color="primary"><Rubrique
                    id='rubrique-organisation'
                    titre="Organisation de vos recherches"
                    description="Priorisez et organisez vos activités de recherche dans cette rubrique"
                    image={RubriqueOrganisationDesRecherches}
                    onClick={() => {
                        setIsOpen(false);
                        navigateTo('/organiser-les-recherches');
                    }}
                /></Badge>
                <Badge badgeContent={correctionsEnCoursDeChargement ? '' : corrections?.length} max={9999}
                       color="primary"><Rubrique
                    id='rubrique-corrections'
                    titre="Apporter des corrections"
                    description="Dans cette rubrique, notez des corrections à apporter à votre généalogie pour les réaliser plus tard"
                    image={RubriqueApportDeCorrections}
                    onClick={() => {
                        setIsOpen(false);
                        navigateTo('/apporter-des-corrections');
                    }}
                /></Badge>
                <Badge badgeContent={archivesEnCoursDeChargement ? '' : archives?.length} max={9999}
                       color="primary"><Rubrique
                    id='rubrique-archives'
                    titre="Recherches aux archives"
                    description="Dans cette rubrique, recensez tous les registres que vous souhaitez consulter lors de vos déplacements aux archives départementales"
                    onClick={() => {
                        setIsOpen(false);
                        navigateTo('/preparer-passage-aux-archives');
                    }}
                    image={RubriquePreparationPassageAuxArchives}
                /></Badge>
                {arbre && arbre.racine && <Rubrique
                    id='rubrique-individus'
                    titre="Recherche d'individus"
                    description="Consultez les fiches détaillées des individus de votre arbre généalogique dans cette rubrique"
                    onClick={() => {
                        setIsOpen(false);
                        navigateTo(`/recherche-d-individus/${arbre.racine}`);
                    }}
                    image={RubriqueRechercheDIndividus}
                />}
                <RubriqueArbre/>
            </Container>
            {arbre?.individus?.length > 0 && <FenetreDeSaisieDeLaRacine
                ouverte={fenetreDeSaisieOuverte}
                fermer={() => setFenetreDeSaisieOuverte(false)}
                individus={arbre?.individus}/>}
        </>
    );
}
