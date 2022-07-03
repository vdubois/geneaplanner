import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import {RotateLeft, RotateRight, ZoomIn, ZoomOut} from "@mui/icons-material";
import {Image} from "./Image";

export const BoiteDeDialogueImage = ({fichierImageOuvert, setFichierImageOuvert, titreDocument, host, token, project, filePath, scale, setScale, rotation, setRotation}) => {
    return <Dialog
        fullWidth
        maxWidth="xl"
        open={fichierImageOuvert}
        onClose={() => setFichierImageOuvert(false)}
    >
        <DialogTitle>{titreDocument}</DialogTitle>
        <DialogContent sx={{textAlign: 'center'}}>
            {host && token && project && filePath && <Image
                host={host}
                token={token}
                project={project}
                filePath={filePath}
                scale={scale}
                rotation={rotation}
            />}
        </DialogContent>
        <DialogActions>
            <Box display="flex" sx={{width: '100%'}}>
                <Box display="flex">
                    <IconButton disabled={scale === 5} color="primary" onClick={() => {
                        setScale(scale => scale + 0.5);
                    }}>
                        <ZoomIn/>
                    </IconButton>
                    <IconButton disabled={scale === 0.5} color="primary" onClick={() => {
                        setScale(scale => scale - 0.5);
                    }}>
                        <ZoomOut/>
                    </IconButton>
                </Box>
                <Box display="flex">
                    <IconButton color="primary" onClick={() => {
                        setRotation(angle => angle - 90);
                    }}>
                        <RotateLeft/>
                    </IconButton>
                    <IconButton color="primary" onClick={() => {
                        setRotation(angle => angle + 90);
                    }}>
                        <RotateRight/>
                    </IconButton>
                </Box>
                <div style={{flexGrow: 1}}></div>
                <Box display="flex">
                    <Button onClick={() => setFichierImageOuvert(false)}>Fermer</Button>
                </Box>
            </Box>
        </DialogActions>
    </Dialog>
}