import {
    Box,
    CircularProgress,
    IconButton
} from "@mui/material";
import {useFichiers, useParametrageFichiers} from "../../api/fichiers.hooks";
import {useEffect, useState} from "react";
import './Documents.css';
import {useAuth0} from "@auth0/auth0-react";
import {
    Image,
    PictureAsPdf
} from "@mui/icons-material";
import {BoiteDeDialoguePDF} from "./BoiteDeDialoguePDF";
import {BoiteDeDialogueImage} from "./BoiteDeDialogueImage";
import {triDesDocuments} from "./triDesDocuments";

export const Documents = ({individu}) => {
    const {isAuthenticated} = useAuth0();
    const {fichiersEnCoursDeChargement, fichiers} = useFichiers(individu);
    const [fichierPDFOuvert, setFichierPDFOuvert] = useState(false);
    const [fichierImageOuvert, setFichierImageOuvert] = useState(false);
    const {parametrageFichiers} = useParametrageFichiers(isAuthenticated);
    const [host, setHost] = useState();
    const [token, setToken] = useState();
    const [project, setProject] = useState();
    const [filePath, setFilePath] = useState();
    const [titreDocument, setTitreDocument] = useState('');
    const [scale, setScale] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(undefined);

    useEffect(() => {
        if (parametrageFichiers) {
            setHost(parametrageFichiers.host);
            setToken(parametrageFichiers.token);
            setProject(parametrageFichiers.project);
        }
    }, [parametrageFichiers]);

    return <Box display="flex" flexDirection="column" alignItems="center" sx={{width: '100%'}}>
        {fichiersEnCoursDeChargement && <CircularProgress/>}
        <Box display="flex" flexDirection="column" sx={{width: '100%'}}>
            {!fichiersEnCoursDeChargement && fichiers?.length > 0 && fichiers.sort(triDesDocuments).map(fichier => <span key={fichier.id}>{fichier.name} <IconButton
                onClick={() => {
                    if (fichier.path.toLowerCase().endsWith(".pdf")) {
                        setFichierPDFOuvert(true);
                    } else {
                        setFichierImageOuvert(true);
                    }
                    setTitreDocument(fichier.name);
                    setFilePath(fichier.path);
                    setScale(1);
                    setRotation(0);
                    setPage(1);
                    setPagesCount(undefined);
                }}
                color="primary"
                component="span">
                {fichier.path.toLowerCase().endsWith(".pdf") ? <PictureAsPdf /> : <Image/>}
            </IconButton></span>)}
        </Box>
        <BoiteDeDialoguePDF
            fichierPDFOuvert={fichierPDFOuvert}
            setFichierPDFOuvert={setFichierPDFOuvert}
            titreDocument={titreDocument}
            host={host}
            token={token}
            project={project}
            filePath={filePath}
            scale={scale}
            setScale={setScale}
            rotation={rotation}
            setRotation={setRotation}
            page={page}
            setPage={setPage}
            pagesCount={pagesCount}
            setPagesCount={setPagesCount}
        />
        <BoiteDeDialogueImage
            fichierImageOuvert={fichierImageOuvert}
            setFichierImageOuvert={setFichierImageOuvert}
            titreDocument={titreDocument}
            host={host}
            token={token}
            project={project}
            filePath={filePath}
            scale={scale}
            setScale={setScale}
            rotation={rotation}
            setRotation={setRotation}
        />
    </Box>;
}
