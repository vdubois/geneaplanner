import React from 'react';
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import Icon from "@material-ui/core/Icon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {useStyles} from "../useStyles";

export const ListeDuMenu = () => {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem button>
                    <ListItemIcon><Icon className="fa fa-pills" /></ListItemIcon>
                    <ListItemText primary="Mes médicaments" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><Icon className="fa fa-user-md" /></ListItemIcon>
                    <ListItemText primary="Mes ordonnances" />
                </ListItem>
            </List>

        </div>
    );
}


