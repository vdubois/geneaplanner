import {useAuth0} from "@auth0/auth0-react";
import {useIndividus, useSupprimerLArbre} from "../api/arbres.hooks";
import {
    Box,
    Button,
    Container,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel
} from "@mui/material";
import {dateAsString} from "../dates";
import Typography from "@mui/material/Typography";
import React, {useState} from "react";
import './Profil.css';
import {useNavigate} from "react-router-dom";

export const Profil = () => {
    const {isAuthenticated, user} = useAuth0();
    const {individusEnCoursDeChargement, individusEnErreur, arbre} = useIndividus(isAuthenticated);
    const supprimerLArbre = useSupprimerLArbre();
    const navigateTo = useNavigate();
    const [fenetreDeConfirmationDeSuppressionOuverte, setFenetreDeConfirmationDeSuppressionOuverte] = useState(false);

    const ConfirmerLaSuppressionDeLArbre = ({open, handleCancel, handleConfirm}) => {
        return <Dialog
            open={open}
            onClose={handleCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Confirmer la suppression
            </DialogTitle>
            <DialogContent dividers>
                <DialogContentText id="alert-dialog-description">
                    &Ecirc;tes-vous s&ucirc;r(e) de vouloir supprimer votre arbre ?<br/>Les donn&eacute;es rattach&eacute;es pourraient ne plus &ecirc;tre exploitables.
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
    return <Container maxWidth="lg">
        {user?.name && <Typography variant="h4" className="ProfilTitre">Profil de {user.name}</Typography>}
        {arbre && arbre?.individus?.length > 0 && <Box id="formulaire" display="flex" flexDirection="column">
            <Box display="flex" alignItems="center" gap="10px">
                <span>Votre arbre généalogique : {arbre.individus.length} individus, dernière mise à jour le {dateAsString(arbre.date)}</span>
                <Button variant="contained" color="primary" onClick={() => setFenetreDeConfirmationDeSuppressionOuverte(true)}>Supprimer</Button>
            </Box>
        </Box>}
        {arbre && arbre?.individus?.length === 0 && <Box id="formulaire" display="flex">
            <Button variant="contained" color="primary" onClick={() => navigateTo('/importer-un-fichier-gedcom')}>Importer votre arbre au format GEDCOM</Button>
        </Box>}
        <ConfirmerLaSuppressionDeLArbre
            open={fenetreDeConfirmationDeSuppressionOuverte}
            handleCancel={() => setFenetreDeConfirmationDeSuppressionOuverte(false)}
            handleConfirm={() => {
                supprimerLArbre();
                setFenetreDeConfirmationDeSuppressionOuverte(false)
            }}/>
    </Container>;
}