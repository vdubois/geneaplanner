import {Modal} from "../components/modal/Modal";
import {tailleInput} from "../commun/tailleInput";
import {useEffect, useState} from "react";
import {useInformationsPersonnelles, useModifierInformationsPersonnelles} from "../api/informationsPersonnelles.hooks";
import {useMediaQuery} from "../hooks/useMediaQuery";
import {breakpoints} from "../index";

export const RenseignerLesInformationsPersonnelles = ({valider}: {valider: () => void}) => {
    const isSmallResolution = useMediaQuery(`(max-width: ${breakpoints.sm}px)`);

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [renseignerLesInformationsPersonnelles, setRenseignerLesInformationsPersonnelles] = useState(false);

    const {enCoursDeChargement, enErreur, informationsPersonnelles} = useInformationsPersonnelles();
    const modifierInformationsPersonnelles = useModifierInformationsPersonnelles();

    useEffect(() => {
        if (!enCoursDeChargement && !informationsPersonnelles?.nom && !informationsPersonnelles?.prenom) {
            setRenseignerLesInformationsPersonnelles(true);
        }
        if (!enCoursDeChargement && informationsPersonnelles?.nom && informationsPersonnelles?.prenom) {
            valider();
        }
    }, [enCoursDeChargement, informationsPersonnelles]);

    useEffect(() => {
        if (renseignerLesInformationsPersonnelles) {
            document.getElementById('nom')?.focus();
        }
    }, [renseignerLesInformationsPersonnelles]);

    const enregistrer = async () => {
        try {
            await modifierInformationsPersonnelles({
                nom,
                prenom
            });
            valider();
        } catch (e) {
            // FIXME gérer erreur
            console.error(e)
        }
    };

    return <Modal
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
    </Modal>;
}
