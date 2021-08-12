import Drawer from "@material-ui/core/Drawer";
import {ListeDuMenu} from "./ListeDuMenu";
import React from "react";
import {useStyles} from "../useStyles";
import {useTheme} from "@material-ui/core/styles";

export const AppMenu = (props) => {
    const classes = useStyles();
    const { window } = props;
    const container = window !== undefined ? () => window().document.body : undefined;
    const theme = useTheme();

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={props.menuOuvertEnModeMobile}
                onClose={props.basculerMenu}
                classes={{
                    paper: classes.drawerPaper,
                }}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <ListeDuMenu close={props.basculerMenu}/>
            </Drawer>
        </nav>
    );
};
