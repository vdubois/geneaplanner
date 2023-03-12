import {Bouton} from "../../components/bouton/Bouton";
import {useRef, useState} from "react";
import {Erreur} from "../../components/Erreur";
import {usePublierArbre} from "../../api/arbres.hooks";

export const ImporterUnFichierGedcomEtape1 = ({avancer, setIndividus}: {avancer: () => void, setIndividus: (individus: Array<never>) => void}) => {

    const [erreur, setErreur] = useState<string>();

    const inputFichier = useRef<HTMLInputElement>(null);

    const publierArbre = usePublierArbre();

    const selectionnerUnFichierGEDCOM = ({target}: any) => {
        const fichier = target.files[0];
        if (fichier) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(fichier);
            fileReader.onload = async ({target}) => {
                const contenuDuFichier = target?.result as string;
                if (!contenuDuFichier.startsWith('data:application/x-gedcom')) {
                    setErreur(`Le fichier ${fichier.name} n'est pas de type GEDCOM`);
                } else {
                    try {
                        avancer();
                        const contenuDuFichierGEDCOM =
                            contenuDuFichier.split('data:application/x-gedcom;base64,')[1];
                        const arbre = await publierArbre(contenuDuFichierGEDCOM);
                        setIndividus(arbre.individus);
                        avancer();
                    } catch (erreur: any) {
                        setErreur(erreur.message);
                    }
                }
            };
        }
    }

    return <>
        <h3 className='texte-centre'>Veuillez sélectionnez un fichier GEDCOM permettant d'importer votre
            arbre généalogique dans GénéaPlanner.</h3>
        <img src='/upload.png' style={{width: '100%'}}/>
        <Bouton
            id='importer-un-fichier-gedcom'
            libelle='Sélectionner un fichier'
            onClick={() => inputFichier?.current?.click()}
        >
            <input
                ref={inputFichier}
                accept=".ged"
                style={{display: 'none'}}
                type="file"
                onChange={selectionnerUnFichierGEDCOM}
            />
        </Bouton>
        {erreur && <Erreur message={erreur} setMessage={setErreur} />}
    </>
}
