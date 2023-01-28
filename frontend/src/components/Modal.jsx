import './Modal.scss';
import {Bouton} from "./Bouton";

export const Modal = ({setIsOpen, titre, contenu, action}) => {
    return (
        <>
            <div className='darkBG' onClick={() => setIsOpen(false)}/>
            <div className='centered'>
                <div className='modal'>
                    <div className='modalHeader'>
                        <div style={{flex: 1}}></div>
                        <h3 className='heading' style={{flex: 2}}>{titre}</h3>
                        <div style={{flex: 1, textAlign: 'right'}}>
                            <span onClick={() => setIsOpen(false)} className='icone-close' style={{marginBottom: "-3px"}}/>
                        </div>
                    </div>
                    <div className='modalContent' dangerouslySetInnerHTML={{__html: contenu}}>
                    </div>
                    <div className='modalActions'>
                        <div className='actionsContainer'>
                            <Bouton
                                libelle='Valider'
                                onClick={() => {
                                    action();
                                    setIsOpen(false);
                                }}/>
                            <Bouton
                                libelle='Annuler'
                                variante='secondaire'
                                onClick={() => setIsOpen(false)}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
