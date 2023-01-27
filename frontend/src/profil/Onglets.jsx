import './Onglets.scss';

export const Onglets = ({ongletActif, setOngletActif, onglets}) => {
    return <div className='d-flex gap-2'>
        {onglets && onglets.map(onglet => (
            <button
                key={'onglet-' + onglet.valeur}
                onClick={() => setOngletActif(onglet.valeur)}
                className={'onglet' + (onglet.valeur == ongletActif ? ' actif' : '')}>{onglet.libelle}</button>
        ))}
    </div>
}
