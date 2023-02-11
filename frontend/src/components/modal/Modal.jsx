import * as React from 'react';
import './Modal.scss';
import {Bouton} from "../bouton/Bouton";
import {breakpoints} from "../../index";
import {useMediaQuery} from "../../hooks/useMediaQuery";
import {Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import classNames from "classnames";
import {useEffect} from "react";

export const Modal = ({ open, setIsOpen, titre, actionDisabled = false, action, children, canClose = true, variant = 'validate-cancel', animation = 'zoomIn' }) => {
    const isSmallXResolution = useMediaQuery(`(max-width: ${breakpoints.sm}px)`);
    const isSmallYResolution = useMediaQuery(`(max-height: ${breakpoints.sm}px)`);

    const BootstrapDialogTitle = (props) => {
        const {children, onClose, canClose, ...other} = props;

        return (
            <DialogTitle component='h3' className='modalHeader heading' {...other}>
                {children}
                {canClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon/>
                    </IconButton>
                ) : null}
            </DialogTitle>
        );
    }

    const handleClose = () => {
        if (canClose) {
            setIsOpen(false);
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullScreen={isSmallXResolution || isSmallYResolution}
            sx={{
                '& .MuiDialog-scrollPaper': {
                    backdropFilter: 'blur(8px)',
                },
                '& .MuiDialog-paper': {
                    borderRadius: '10px',
                    overflowY: 'hidden'
                },
            }}
            PaperProps={{
                className: classNames('modal', animation ? 'animate__animated' : '', animation ? `animate__${animation}` : '', animation ? `animate__faster` : '')
            }}
        >
            <BootstrapDialogTitle
                onClose={handleClose}
                canClose={canClose}
            >
                {titre}
            </BootstrapDialogTitle>
            <DialogContent className='modalContent'>
                {children}
            </DialogContent>
            <DialogActions className={variant !== 'no-action' ? 'modalActions' : ''}>
                {variant === 'validate-cancel' && <>
                    <Bouton
                        libelle='Valider'
                        disabled={actionDisabled}
                        onClick={() => {
                            action();
                            setIsOpen(false);
                        }}/>
                    {canClose && <Bouton
                        libelle='Annuler'
                        variante='secondaire'
                        onClick={() => setIsOpen(false)}/>}
                </>}
                {variant === 'close' && <Bouton
                    libelle='Fermer'
                    onClick={() => setIsOpen(false)}/>
                }
            </DialogActions>
        </Dialog>
    );
}
