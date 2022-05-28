import React from 'react';
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import './BarreDeNavigation.css';
import {BoutonMenu} from "./BoutonMenu";
import {Titre} from "./Titre";
import {IdentificationAvatar} from "./IdentificationAvatar";

export const BarreDeNavigation = (props) => {
    return (
        <AppBar position="fixed" sx={{backgroundColor: '#F46912 !important', color: '#fff !important'}}>
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
