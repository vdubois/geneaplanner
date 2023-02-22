import './Bouton.scss';
import classNames from "classnames";
import {FC, ReactNode} from "react";

type VarianteBouton = 'principale' | 'secondaire' | 'danger';

interface BoutonProps {
    id?: string;
    libelle?: string;
    onClick?: () => void;
    disabled?: boolean;
    variante?: VarianteBouton;
    taille?: string;
    children?: ReactNode;
    style?: object;
}

export const Bouton: FC<BoutonProps> = ({id, libelle, onClick, disabled = false, variante = 'principale', taille, children, style}) => {
    return <button
        id={id}
        className={classNames('button', variante)}
        onClick={onClick}
        style={{
            ...style,
            maxWidth: taille ? taille : ''
        }}
        disabled={disabled}>{libelle}{children}</button>
}
