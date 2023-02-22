import './MessageDeConfirmation.scss';
import {FC} from "react";

interface MessageDeConfirmationProps {
    libelle: string;
}

export const MessageDeConfirmation: FC<MessageDeConfirmationProps> = ({libelle}) => {
    return <div className='d-flex gap-1 confirmation'>
        <span className='icone-confirmation'></span>
        <div dangerouslySetInnerHTML={{__html: libelle}}></div>
    </div>
}
