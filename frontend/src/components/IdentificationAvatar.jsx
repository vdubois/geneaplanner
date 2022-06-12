import {Avatar, CircularProgress, Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {useNavigate} from "react-router-dom";

export const IdentificationAvatar = () => {

    const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            loginWithRedirect();
        }
    });
    const [ancreDuMenuAvatar, modifierAncreDuMenuAvatar] = useState(null);
    const menuAvatarEstOuvert = Boolean(ancreDuMenuAvatar);
    const ouvrirMenuAvatar = (event) => {
        modifierAncreDuMenuAvatar(event.currentTarget);
    };
    const fermerMenuAvatar = () => {
        modifierAncreDuMenuAvatar(null);
    };
    const navigateTo = useNavigate();

    return (
        <React.Fragment>
            {isLoading && (
                <div className="AppBarIcones">
                    <CircularProgress
                        color="secondary"
                        size={38}
                    />
                </div>
            )}
            {isAuthenticated && (
                <div className="AppBarIcones">
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={ouvrirMenuAvatar}
                        color="inherit"
                        className="BoutonAvatar"
                    >
                        <Tooltip title={user.name}>
                            <Avatar
                                alt={user.name}
                                src={user.picture}
                                className="Avatar"
                            />
                        </Tooltip>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={ancreDuMenuAvatar}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        open={menuAvatarEstOuvert}
                        onClose={fermerMenuAvatar}
                    >
                        <MenuItem onClick={() => navigateTo('/profil')}>Profil</MenuItem>
                        <MenuItem onClick={() => logout()}>Déconnexion</MenuItem>
                    </Menu>
                </div>
            )}
        </React.Fragment>
    );
};
