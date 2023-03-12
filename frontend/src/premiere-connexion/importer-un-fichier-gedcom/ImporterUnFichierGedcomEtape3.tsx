import {Checkmark} from "../../components/Checkmark";
import {Bouton} from "../../components/bouton/Bouton";

export const ImporterUnFichierGedcomEtape3 = ({avancer, individus}: {avancer: () => void, individus: Array<never>}) => {
    return <>
        <Checkmark/>
        <h3 className='texte-centre'>Import de {individus?.length} individus avec succ&egrave;s.</h3>
        <h3 className='texte-principale-4 texte-centre mb-1'>Vos informations ont &eacute;t&eacute; prises en
            compte, vous pouvez d&egrave;s &agrave; pr&eacute;sent profiter des fonctionnalit&eacute;s de
            G&eacute;n&eacute;aplanner.</h3>
        <Bouton
            id='valider'
            libelle='Valider'
            style={{
                marginBottom: '-2rem',
                marginTop: '2rem'
            }}
            onClick={avancer}
        />
    </>;
}
