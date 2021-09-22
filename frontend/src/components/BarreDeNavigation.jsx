import React from 'react';
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import {useStyles} from "../useStyles";
import './BarreDeNavigation.css';
import {BoutonMenu} from "./BoutonMenu";
import {Titre} from "./Titre";
import {IdentificationAvatar} from "./IdentificationAvatar";

export const BarreDeNavigation = (props) => {

    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <BoutonMenu basculerMenu={props.basculerMenu}/>
                <div className="AppBarContenu">
                    <Titre/>
                    <IdentificationAvatar/>
                </div>
            </Toolbar>
        </AppBar>
    );
};
