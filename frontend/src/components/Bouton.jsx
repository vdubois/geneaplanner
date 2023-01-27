import './Bouton.scss';
import classNames from "classnames";

export const Bouton = ({id, libelle, onClick, disabled = false, variante = 'principale'}) => {
    return <button
        id={id}
        className={classNames('button', variante)}
        onClick={onClick}
        disabled={disabled}>{libelle}</button>
}
