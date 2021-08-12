import React from 'react';
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {useStyles} from "../useStyles";
import {Assignment, AssignmentTurnedIn, MenuBook, PersonPin, Publish} from "@material-ui/icons";
import {useHistory} from "react-router-dom";

export const ListeDuMenu = ({close}) => {
    const classes = useStyles();
    const history = useHistory();
    return (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem button>
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
                <ListItem button>
                    <ListItemIcon><MenuBook /></ListItemIcon>
                    <ListItemText primary="Préparer votre passage aux archives" />
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


