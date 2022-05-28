import React from 'react';
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import {Assignment, AssignmentTurnedIn, MenuBook, PersonPin, Publish} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";

export const ListeDuMenu = ({close}) => {
    const navigateTo = useNavigate();
    const Toolbar = styled('div')(({theme}) => ({
        ...theme.mixins.toolbar,
        display: 'flex',
        justifyContent: 'center'
    }));
    return (
        <div>
            <Toolbar/>
            <Divider />
            <List>
                <ListItem button onClick={() => {
                    navigateTo('/organiser-les-recherches');
                    close();
                }}>
                    <ListItemIcon><Assignment /></ListItemIcon>
                    <ListItemText primary="Organisation de vos recherches" />
                </ListItem>
                <ListItem button onClick={() => {
                    navigateTo('/apporter-des-corrections');
                    close();
                }}>
                    <ListItemIcon><AssignmentTurnedIn /></ListItemIcon>
                    <ListItemText primary="Apporter des corrections" />
                </ListItem>
                <ListItem button onClick={() => {
                    navigateTo("/preparer-passage-aux-archives");
                    close();
                }}>
                    <ListItemIcon><MenuBook /></ListItemIcon>
                    <ListItemText primary="Recherches aux archives" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><PersonPin /></ListItemIcon>
                    <ListItemText primary="Recherche d'individus" />
                </ListItem>
                <ListItem button onClick={() => {
                    navigateTo('/importer-un-fichier-gedcom');
                    close();
                }}>
                    <ListItemIcon><Publish /></ListItemIcon>
                    <ListItemText primary="Importer un fichier GEDCOM" />
                </ListItem>
            </List>

        </div>
    );
}


