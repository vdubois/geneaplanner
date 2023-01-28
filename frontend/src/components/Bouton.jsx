import './Bouton.scss';
import classNames from "classnames";

export const Bouton = ({id, libelle, onClick, disabled = false, variante = 'principale', taille}) => {
    return <button
        id={id}
        className={classNames('button', variante)}
        onClick={onClick}
        style={{
            maxWidth: taille ? taille : ''
        }}
        disabled={disabled}>{libelle}</button>
}
