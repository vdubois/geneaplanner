import {Modal} from "../components/modal/Modal";
import React, {useEffect, useState} from "react";
import {useIndividus} from "../api/arbres.hooks";
import {ImporterUnFichierGedcomEtape1} from "./importer-un-fichier-gedcom/ImporterUnFichierGedcomEtape1";
import {ImporterUnFichierGedcomEtape2} from "./importer-un-fichier-gedcom/ImporterUnFichierGedcomEtape2";
import {ImporterUnFichierGedcomEtape3} from "./importer-un-fichier-gedcom/ImporterUnFichierGedcomEtape3";
import useStep from "../hooks/useStep";

export const ImporterUnFichierGedcom = () => {
    const [etape, {goToNextStep: avancer}] = useStep(4, 0);

    const [individus, setIndividus] = useState([]);
    const {arbre, individusEnCoursDeChargement} = useIndividus();

    useEffect(() => {
        if (!individusEnCoursDeChargement && (!arbre || !arbre.individus || !arbre?.individus?.length || arbre?.individus?.length === 0)) {
            avancer();
        }
    }, [individusEnCoursDeChargement, arbre]);

    return <>
        <Modal
            open={etape >= 1 && etape < 4}
            titre='Importer un fichier GEDCOM'
            actionDisabled={true}
            canClose={false}
            variant='no-action'
        >
            <div className='d-flex flex-column align-items-center gap-2'>
                {etape === 1 && <ImporterUnFichierGedcomEtape1 avancer={avancer} setIndividus={setIndividus}/>}
                {etape === 2 && <ImporterUnFichierGedcomEtape2/>}
                {etape === 3 && <ImporterUnFichierGedcomEtape3 avancer={avancer} individus={individus} />}
            </div>
        </Modal>
    </>;
}
