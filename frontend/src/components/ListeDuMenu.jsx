import React from 'react';
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import {useStyles} from "../useStyles";
import {Assignment, AssignmentTurnedIn, MenuBook, PersonPin, Publish} from "@mui/icons-material";
import {useHistory} from "react-router-dom";

export const ListeDuMenu = ({close}) => {
    const classes = useStyles();
    const history = useHistory();
    return (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem button onClick={() => {
                    history.push('/organiser-les-recherches');
                    close();
                }}>
                    <ListItemIcon><Assignment /></ListItemIcon>
                    <ListItemText primary="Organisation de vos recherches" />
                </ListItem>
                <ListItem button onClick={() => {
                    history.push('/apporter-des-corrections');
                    close();
                }}>
                    <ListItemIcon><AssignmentTurnedIn /></ListItemIcon>
                    <ListItemText primary="Apporter des corrections" />
                </ListItem>
                <ListItem button onClick={() => {
                    history.push("/preparer-passage-aux-archives");
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
                    history.push('/importer-un-fichier-gedcom');
                    close();
                }}>
                    <ListItemIcon><Publish /></ListItemIcon>
                    <ListItemText primary="Importer un fichier GEDCOM" />
                </ListItem>
            </List>

        </div>
    );
}


