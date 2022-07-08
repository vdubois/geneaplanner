import {Delete} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import React, {useState} from "react";
import {useAdminSupprimerArchive} from "../../api/archives.admin.hooks";
import {ConfirmerLaSuppressionDeLArchive} from "./ConfirmerLaSuppressionDeLArchive";

export const Supprimer = ({archive}) => {
    const suppression = useAdminSupprimerArchive(archive.id);
    const [fenetreDeConfirmationDeSuppressionOuverte, setFenetreDeConfirmationDeSuppressionOuverte] = useState(false);

    return <>
        <IconButton onClick={() => setFenetreDeConfirmationDeSuppressionOuverte(true)}>
            <Delete/>
        </IconButton>
        <ConfirmerLaSuppressionDeLArchive
            open={fenetreDeConfirmationDeSuppressionOuverte}
            handleCancel={() => setFenetreDeConfirmationDeSuppressionOuverte(false)}
            handleConfirm={async () => {
                await suppression();
                setFenetreDeConfirmationDeSuppressionOuverte(false)
            }}/>
    </>;
}