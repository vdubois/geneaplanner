import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
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
