import {Edit} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import React from "react";

export const Modifier = ({archive, setArchive, setFenetreDeSaisieOuverte}) => {
    return <IconButton onClick={() => {
        setArchive(archive);
        setFenetreDeSaisieOuverte(true);
    }}>
        <Edit/>
    </IconButton>;
}