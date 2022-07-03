import {useEffect, useState} from "react";
import PDFViewer from 'pdf-viewer-reactjs';
import axios from "axios";
import {base64ArrayBuffer} from "./base64ArrayBuffer";
import {CircularProgress} from "@mui/material";

export const PDF = ({host, token, project, filePath, scale, rotation, page, setPagesCount}) => {
    const [contenu, setContenu] = useState();
    const [enCoursDeChargement, setEnCoursDeChargement] = useState(false);

    useEffect(() => {
        setEnCoursDeChargement(true)
        const fetchPDF = async (filePath) => {
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
        fetchPDF(filePath)
            .then(text => setContenu(base64ArrayBuffer(text)))
            .finally(() => setEnCoursDeChargement(false));
    }, [host, token, project, filePath, scale, rotation, page]);

    return <>
        {enCoursDeChargement && <CircularProgress/>}
        {!enCoursDeChargement && contenu && <PDFViewer
            document={{
                base64: contenu,
            }}
            scale={scale}
            externalInput
            scaleStep={0.5}
            maxScale={5}
            minScale={0.5}
            rotationAngle={rotation}
            page={page}
            getMaxPageCount={(pageCount) => setPagesCount(pageCount)}
        />}
    </>;
}