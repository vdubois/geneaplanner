import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import React from "react";

export const BoutonMenu = (props) => {

    return (<IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={props.basculerMenu}
    >
        <MenuIcon/>
    </IconButton>);
};
