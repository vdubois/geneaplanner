import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import React from "react";
import {useStyles} from "../useStyles";

export const BoutonMenu = (props) => {

    const classes = useStyles();
    return (<IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={props.basculerMenu}
        className={classes.menuButton}
    >
        <MenuIcon/>
    </IconButton>);
};
