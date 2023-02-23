import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import {PDF} from "./PDF";
import {ChevronLeft, ChevronRight, Close, RotateLeft, RotateRight, ZoomIn, ZoomOut} from "@mui/icons-material";

export const BoiteDeDialoguePDF = ({fichierPDFOuvert, setFichierPDFOuvert, titreDocument, host, token, project, filePath, scale, setScale, rotation, setRotation, page, setPage, pagesCount, setPagesCount}) => {
    const onClose = () => setFichierPDFOuvert(false);
    return <Dialog
        fullWidth
        maxWidth="xl"
        open={fichierPDFOuvert}
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
            {host && token && project && filePath && <PDF
                host={host}
                token={token}
                project={project}
                filePath={filePath}
                scale={scale}
                rotation={rotation}
                page={page}
                pagesCount={pagesCount}
                setPagesCount={setPagesCount}
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
                {pagesCount && <Box display="flex" alignItems="center">
                    <IconButton disabled={page === 1} color="primary" onClick={() => setPage(p => p - 1)}>
                        <ChevronLeft/>
                    </IconButton>
                    <span>Page {page} / {pagesCount}</span>
                    <IconButton disabled={page === pagesCount} color="primary" onClick={() => setPage(p => p + 1)}>
                        <ChevronRight/>
                    </IconButton>
                </Box>}
                <div style={{flexGrow: 1}}></div>
                <Box display="flex">
                    <Button onClick={onClose}>Fermer</Button>
                </Box>
            </Box>
        </DialogActions>
    </Dialog>
}