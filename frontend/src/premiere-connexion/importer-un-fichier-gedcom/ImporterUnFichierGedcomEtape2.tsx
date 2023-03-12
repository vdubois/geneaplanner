import {CircularProgress} from "@mui/material";

export const ImporterUnFichierGedcomEtape2 = () => {
    return <>
        <h3 className='texte-centre'>Import du fichier GEDCOM en cours, veuillez patienter...</h3>
        <CircularProgress/>
    </>;
}
