import './Onglets.scss';
import {FC} from "react";

interface Onglet {
    valeur: number;
    libelle: string;
}

interface OngletsProps {
    ongletActif: number;
    setOngletActif: (onglet: number) => void;
    onglets: Array<Onglet>;
}

export const Onglets: FC<OngletsProps> = ({ongletActif, setOngletActif, onglets}) => {
    return <div className='d-flex gap-2 flex-wrap'>
        {onglets && onglets.map(onglet => (
            <button
                key={'onglet-' + onglet.valeur}
                onClick={() => setOngletActif(onglet.valeur)}
                className={'onglet' + (onglet.valeur == ongletActif ? ' actif' : '')}>{onglet.libelle}</button>
        ))}
    </div>
}
