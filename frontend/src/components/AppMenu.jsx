import Drawer from "@mui/material/Drawer";
import {ListeDuMenu} from "./ListeDuMenu";
import React from "react";
import {styled, useTheme} from "@mui/material/styles";

export const AppMenu = (props) => {
    const { window } = props;
    const container = window !== undefined ? () => window().document.body : undefined;
    const theme = useTheme();

    const DrawerWrapper = styled('nav')({
        flexShrink: 0
    });
    return (
        <DrawerWrapper aria-label="mailbox folders">
            <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={props.menuOuvertEnModeMobile}
                onClose={props.basculerMenu}
                sx={{width: '240px'}}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <ListeDuMenu close={props.basculerMenu}/>
            </Drawer>
        </DrawerWrapper>
    );
};
