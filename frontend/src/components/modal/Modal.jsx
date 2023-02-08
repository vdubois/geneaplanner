import './Modal.scss';
import {Bouton} from "../bouton/Bouton";
import classNames from "classnames";
import {breakpoints} from "../../index";
import {useMediaQuery} from "../../hooks/useMediaQuery";

export const Modal = ({setIsOpen, titre, actionDisabled = false, action, children, canClose = true, animation = '', variant = ''}) => {
    const isGreaterThanSmallResolution = useMediaQuery(`(min-width: ${breakpoints.sm}px)`);
    const isSmallResolution = useMediaQuery(`(max-width: ${breakpoints.sm}px)`);

    return (
        <>
            {isGreaterThanSmallResolution && <div className='darkBG' onClick={() => {
                if (canClose) {
                    setIsOpen(false);
                }
            }}/>}
            <div className='centered'>
                <div className={classNames('modal', animation ? 'animate__animated' : '', animation ? `animate__${animation}` : '', animation ? `animate__faster` : '')}>
                    {isSmallResolution && <div className='modalHeader'>
                        <h3 className='heading'>{titre}</h3>
                    </div>}
                    {isGreaterThanSmallResolution && <div className='modalHeader mb-2'>
                        <div style={{flex: 1}}></div>
                        <h3 className='heading' style={{flex: 2}}>{titre}</h3>
                        <div style={{flex: 1, textAlign: 'right'}}>
                            {canClose && <span onClick={() => setIsOpen(false)} className='icone-close' style={{marginBottom: "-3px"}}/>}
                        </div>
                    </div>}
                    <div className='modalContent'>
                        {children}
                    </div>
                    <div className='modalActions mt-2'>
                        <div className='actionsContainer'>
                            {variant !== 'close' && <>
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
                                onClick={() => setIsOpen(false)} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
