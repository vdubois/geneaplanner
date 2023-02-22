import * as React from 'react';
import './Modal.scss';
import {Bouton} from "../bouton/Bouton";
import {breakpoints} from "../../index";
import {useMediaQuery} from "../../hooks/useMediaQuery";
import {Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import classNames from "classnames";
import {ReactNode} from "react";

type ModalVariant = 'validate-cancel' | 'no-action' | 'close';

type ModalAnimation = 'zoomIn';

interface ModalProps {
    open: boolean;
    setIsOpen?: (open: boolean) => void;
    actionDisabled?: boolean;
    action?: () => void;
    children: ReactNode;
    canClose?: boolean;
    variant?: ModalVariant;
    titre: string;
    animation?: ModalAnimation;
}

interface DialogTitleProps {
    children: ReactNode;
    onClose: () => void;
    canClose: boolean;
}

export const Modal = ({ open, setIsOpen, titre, actionDisabled = false, action, children, canClose = true, variant = 'validate-cancel', animation = 'zoomIn' }: ModalProps) => {
    const isSmallXResolution = useMediaQuery(`(max-width: ${breakpoints.sm}px)`);
    const isSmallYResolution = useMediaQuery(`(max-height: ${breakpoints.sm}px)`);

    const BootstrapDialogTitle = (props: DialogTitleProps) => {
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
            if (setIsOpen) {
                setIsOpen(false);
            }
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
            {variant !== 'no-action' && <DialogActions className='modalActions'>
                {variant === 'validate-cancel' && <>
                    <Bouton
                        libelle='Valider'
                        disabled={actionDisabled}
                        onClick={() => {
                            if (action) {
                                action();
                            }
                            if (setIsOpen) {
                                setIsOpen(false);
                            }
                        }}/>
                    {canClose && <Bouton
                        libelle='Annuler'
                        variante='secondaire'
                        onClick={() => {
                            if (setIsOpen) {
                                setIsOpen(false)
                            }
                        }}/>}
                </>}
                {variant === 'close' && <Bouton
                    libelle='Fermer'
                    onClick={() => {
                        if (setIsOpen) {
                            setIsOpen(false)
                        }
                    }}/>
                }
            </DialogActions>}
        </Dialog>
    );
}
