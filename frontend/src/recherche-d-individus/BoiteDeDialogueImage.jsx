import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import {Close, RotateLeft, RotateRight, ZoomIn, ZoomOut} from "@mui/icons-material";
import {Image} from "./Image";

export const BoiteDeDialogueImage = ({fichierImageOuvert, setFichierImageOuvert, titreDocument, host, token, project, filePath, scale, setScale, rotation, setRotation}) => {
    const onClose = () => setFichierImageOuvert(false);
    return <Dialog
        fullWidth
        maxWidth="xl"
        open={fichierImageOuvert}
        onClose={onClose}
        scroll="paper"
    >
        <DialogTitle>
            {titreDocument}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Close />
                </IconButton>
            ) : null}
        </DialogTitle>
        <DialogContent sx={{textAlign: 'center', height: '100vh'}}>
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
                        setScale(scale => scale + 1);
                    }}>
                        <ZoomIn/>
                    </IconButton>
                    <IconButton disabled={scale === 1} color="primary" onClick={() => {
                        setScale(scale => scale - 1);
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
                    <Button onClick={onClose}>Fermer</Button>
                </Box>
            </Box>
        </DialogActions>
    </Dialog>
}