import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import React from "react";

export const ConfirmerLaSuppressionDeLArchive = ({open, handleCancel, handleConfirm}) => {
    return <Dialog
        open={open}
        onClose={handleCancel}
    >
        <DialogTitle id="alert-dialog-title">
            Confirmer la suppression
        </DialogTitle>
        <DialogContent dividers>
            <DialogContentText id="alert-dialog-description">
                &Ecirc;tes-vous s&ucirc;r(e) de vouloir supprimer ces archives ?<br/>Les donn&eacute;es rattach&eacute;es pourraient ne plus &ecirc;tre exploitables.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" color="inherit" onClick={handleCancel}>Annuler</Button>
            <Button variant="contained" color="primary" onClick={handleConfirm} autoFocus>
                Valider
            </Button>
        </DialogActions>
    </Dialog>
}