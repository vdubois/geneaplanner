import {useEffect, useState} from "react";
import PDFViewer from 'pdf-viewer-reactjs';
import axios from "axios";
import {base64ArrayBuffer} from "./base64ArrayBuffer";
import {Box, CircularProgress} from "@mui/material";

export const PDF = ({host, token, project, filePath, scale, rotation, page, setPagesCount}) => {
    const [contenu, setContenu] = useState();
    const [enCoursDeChargement, setEnCoursDeChargement] = useState(true);

    useEffect(() => {
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
            .then(text => {
                const contenuDuFichier = base64ArrayBuffer(text);
                setContenu(contenuDuFichier);
                setTimeout(() => {
                    setContenu('');
                    setTimeout(() => {
                        setContenu(contenuDuFichier);
                    }, 50)
                }, 50);
            })
            .finally(() => setEnCoursDeChargement(false));
    }, [host, token, project, filePath]);

    useEffect(() => {
        const contenuDuFichier = contenu;
        setContenu(undefined);
        setTimeout(() => {
            setContenu(contenuDuFichier);
        }, 50);
    }, [scale, rotation, page]);

    return <>
        {enCoursDeChargement === true && <Box display="flex" justifyContent="center" alignItems="center" sx={{height: '100%'}}>
            <CircularProgress color="primary" size={40}/>
        </Box>}
        {!enCoursDeChargement && contenu && <PDFViewer
            document={{
                base64: contenu,
            }}
            loader={<CircularProgress color="primary" size={40}/>}
            scale={scale}
            externalInput
            scaleStep={1}
            maxScale={5}
            minScale={0.5}
            rotationAngle={rotation}
            page={page}
            canvasCss="canvas-pdf"
            getMaxPageCount={(pageCount) => setPagesCount(pageCount)}
        />}
    </>;
}