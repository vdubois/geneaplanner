import {useEffect, useState} from "react";
import PDFViewer from 'pdf-viewer-reactjs';
import axios from "axios";
import {base64ArrayBuffer} from "./base64ArrayBuffer";
import {CircularProgress} from "@mui/material";

export const Image = ({host, token, project, filePath, scale, rotation}) => {
    const [contenu, setContenu] = useState();
    const [enCoursDeChargement, setEnCoursDeChargement] = useState(false);

    useEffect(() => {
        setEnCoursDeChargement(true)
        const fetchImage = async (filePath) => {
            const {data} = await axios({
                url: `${host}/api/v4/projects/${project}/repository/files/${encodeURIComponent(filePath)}/raw`,
                responseType: "arraybuffer",
                responseEncoding: "binary",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return data;
        };
        fetchImage(filePath)
            .then(text => setContenu(base64ArrayBuffer(text)))
            .finally(() => setEnCoursDeChargement(false));
    }, [host, token, project, filePath]);

    useEffect(() => {
        setEnCoursDeChargement(true);
        const contenuDuFichier = contenu;
        setContenu(undefined);
        setTimeout(() => {
            setEnCoursDeChargement(false);
            setContenu(contenuDuFichier);
        }, 400);
    }, [scale, rotation]);

    return <>
        {enCoursDeChargement && <CircularProgress/>}
        {!enCoursDeChargement && contenu && <img
            src={`data:image/${filePath.substring(filePath.lastIndexOf('.'))};base64,${contenu}`}
            width={1000}
            height={1000}
        />}
    </>;
}