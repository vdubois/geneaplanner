import './MessageDeConfirmation.scss';

export const MessageDeConfirmation = ({libelle}) => {
    return <div className='d-flex gap-1 confirmation'>
        <span className='icone-confirmation'></span>
        <div dangerouslySetInnerHTML={{__html: libelle}}></div>
    </div>
}
