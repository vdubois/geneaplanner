import {useEffect, useState} from "react";
import PDFViewer from 'pdf-viewer-reactjs';
import axios from "axios";
import {base64ArrayBuffer} from "./base64ArrayBuffer";
import {Box, CircularProgress} from "@mui/material";

export const Image = ({host, token, project, filePath, scale, rotation}) => {
    const [contenu, setContenu] = useState();
    const [enCoursDeChargement, setEnCoursDeChargement] = useState(true);

    useEffect(() => {
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
        const contenuDuFichier = contenu;
        setContenu(undefined);
        setTimeout(() => {
            setContenu(contenuDuFichier);
        }, 50);
    }, [scale, rotation]);

    return <>
        {enCoursDeChargement && <Box display="flex" justifyContent="center" alignItems="center" sx={{height: '100%'}}>
            <CircularProgress/>
        </Box>}
        {!enCoursDeChargement && contenu && <img
            src={`data:image/${filePath.substring(filePath.lastIndexOf('.'))};base64,${contenu}`}
            width={1000 * scale}
            style={{
                maxWidth: 'none',
                transform: `rotate(${rotation}deg)`
            }}
        />}
    </>;
}