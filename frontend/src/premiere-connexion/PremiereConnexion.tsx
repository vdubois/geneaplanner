import {Modal} from "../components/modal/Modal";
import {tailleInput} from "../commun/tailleInput";
import {Checkmark} from "../components/Checkmark";
import {useEffect, useRef, useState} from "react";
import {useMediaQuery} from "../hooks/useMediaQuery";
import {breakpoints} from "../index";
import {useInformationsPersonnelles, useModifierInformationsPersonnelles} from "../api/informationsPersonnelles.hooks";
import {useIndividus, usePublierArbre} from "../api/arbres.hooks";
import {Bouton} from "../components/bouton/Bouton";
import {Erreur} from "../components/Erreur";
import {CircularProgress} from "@mui/material";

export const PremiereConnexion = () => {
    const isSmallResolution = useMediaQuery(`(max-width: ${breakpoints.sm}px)`)

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [renseignerLesInformationsPersonnelles, setRenseignerLesInformationsPersonnelles] = useState(false);
    const [importerUnFichierGedcom, setImporterUnFichierGedcom] = useState(false);
    const [afficherSucces, setAfficherSucces] = useState(false);
    const [importDeFichierGedcomEnCours, setImportDeFichierGedcomEnCours] = useState(false);
    const [erreur, setErreur] = useState<string>();
    const [individus, setIndividus] = useState([]);

    const inputFichier = useRef<HTMLInputElement>(null);

    const {enCoursDeChargement, enErreur, informationsPersonnelles} = useInformationsPersonnelles();
    const modifierInformationsPersonnelles = useModifierInformationsPersonnelles();
    const {arbre, individusEnCoursDeChargement} = useIndividus();
    const publierArbre = usePublierArbre();

    useEffect(() => {
        if (renseignerLesInformationsPersonnelles) {
            document.getElementById('nom')?.focus();
        }
    }, [renseignerLesInformationsPersonnelles])

    const enregistrer = async () => {
        try {
            await modifierInformationsPersonnelles({
                nom,
                prenom
            });
            setImporterUnFichierGedcom(true);
        } catch (e) {
            console.error(e)
        }
    };

    const selectionnerUnFichierGEDCOM = ({target}: any) => {
        console.log('coucou')
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
                        setImportDeFichierGedcomEnCours(true);
                        const contenuDuFichierGEDCOM =
                            contenuDuFichier.split('data:application/x-gedcom;base64,')[1];
                        const arbre = await publierArbre(contenuDuFichierGEDCOM);
                        setIndividus(arbre.individus);
                    } catch (erreur: any) {
                        setErreur(erreur.message);
                    } finally {
                        setImportDeFichierGedcomEnCours(false);
                    }
                }
            };
        }
    }

    useEffect(() => {
        if (!enCoursDeChargement && !informationsPersonnelles?.nom && !informationsPersonnelles?.prenom) {
            setRenseignerLesInformationsPersonnelles(true);
        }
    }, [enCoursDeChargement, informationsPersonnelles]);

    useEffect(() => {
        if (!renseignerLesInformationsPersonnelles && !individusEnCoursDeChargement && arbre && !(arbre?.individus?.length > 0)) {
            setImporterUnFichierGedcom(true);
        }
    }, [arbre, individusEnCoursDeChargement, renseignerLesInformationsPersonnelles]);

    return <>
        <Modal
            open={renseignerLesInformationsPersonnelles}
            titre='Bienvenue !'
            actionDisabled={!nom || !prenom}
            setIsOpen={setRenseignerLesInformationsPersonnelles}
            action={enregistrer}
            canClose={false}
        >
            <div className="d-flex flex-column gap-1 personnelles">
                <h3 className='mb-2 texte-centre'>Afin de personnaliser au mieux votre exp&eacute;rience, veuillez tout d'abord renseigner vos informations personnelles :</h3>
                <div className='d-flex flex-column align-items-center gap-1'>
                    <div className='d-flex flex-column gap-1'>
                        <span className='libelle-champ'>Nom<span className='texte-danger'>&#160;*</span></span>
                        <input
                            id='nom'
                            type='text'
                            style={{width: tailleInput(isSmallResolution ? '280px' : '400px')}}
                            value={nom}
                            autoComplete='new-password'
                            onChange={(event) => setNom(event.target.value)}
                        />
                    </div>
                    <div className='d-flex flex-column gap-1 mb-1'>
                        <span className='libelle-champ'>Pr&eacute;nom<span className='texte-danger'>&#160;*</span></span>
                        <input
                            id='prenom'
                            type='text'
                            style={{width: tailleInput(isSmallResolution ? '280px' : '400px')}}
                            value={prenom}
                            autoComplete='new-password'
                            onChange={(event) => setPrenom(event.target.value)}
                        />
                    </div>
                </div>
            </div>
        </Modal>
        <Modal
            open={importerUnFichierGedcom}
            titre='Importer un fichier GEDCOM'
            actionDisabled={true}
            canClose={false}
            variant='no-action'
        >
            <div className='d-flex flex-column align-items-center gap-2'>
                {!importDeFichierGedcomEnCours && !(individus?.length > 0) && (!arbre || arbre?.individus?.length === 0) && <>
                    <h3 className='texte-centre'>Veuillez sélectionnez un fichier GEDCOM permettant d'importer votre arbre généalogique dans GénéaPlanner.</h3>
                    <img src='/upload.png' style={{width: '100%'}} />
                    <Bouton
                        id='importer-un-fichier-gedcom'
                        libelle='Sélectionner un fichier'
                        onClick={() => inputFichier?.current?.click()}
                    >
                        <input
                            ref={inputFichier}
                            accept=".ged"
                            style={{ display: 'none' }}
                            type="file"
                            onChange={selectionnerUnFichierGEDCOM}
                        />
                    </Bouton>
                </>}
                {importDeFichierGedcomEnCours && <>
                    <h3 className='texte-centre'>Import du fichier GEDCOM en cours, veuillez patienter...</h3>
                    <CircularProgress/>
                </>}
                {!importDeFichierGedcomEnCours && individus?.length > 0 && <>
                    <Checkmark/>
                    <h3 className='texte-centre'>Import du fichier terminé avec succès.<br/>Votre arbre comporte {individus?.length} individus.</h3>
                    <Bouton
                        id='valider'
                        libelle='Valider'
                        style={{
                            marginBottom: '-2rem',
                            marginTop: '2rem'
                        }}
                        onClick={() => {
                            setImporterUnFichierGedcom(false);
                            // FIXME
                            setIndividus([]);
                            setAfficherSucces(true);
                        }}
                    />
                </>}
            </div>
        </Modal>
        <Modal
            open={afficherSucces}
            titre='Merci !'
            variant='close'
            setIsOpen={setAfficherSucces}
        >
            <div className='d-flex flex-column align-items-center gap-2'>
                <Checkmark/>
                <h3 className='texte-principale-4 texte-centre mb-1'>Vos informations ont &eacute;t&eacute; prises en compte, vous pouvez d&egrave;s &agrave; pr&eacute;sent profiter des fonctionnalit&eacute;s de G&eacute;n&eacute;aplanner.</h3>
            </div>
        </Modal>
        {erreur && <Erreur message={erreur} setMessage={setErreur} />}
    </>
}
