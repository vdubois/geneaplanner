import './Input.scss';

export const Input = ({id, disabled = false, type = 'text', value, taille, onChange}) => {
    return <input
        id={id}
        disabled={disabled}
        type={type}
        value={value}
        style={{
            maxWidth: taille ? 'calc(' + taille + ' - 34px)' : ''
        }}
        onChange={onChange}
    />
}
