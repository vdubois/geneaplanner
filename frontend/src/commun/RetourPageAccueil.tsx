import {useNavigate} from "react-router-dom";
import './RetourPageAccueil.scss';

export const RetourPageAccueil = () => {
    const navigateTo = useNavigate();
    return <div className='d-flex align-items-center gap-05'>
        <span className="retour-icone"></span>
        <a
            onClick={() => navigateTo('/')}
            className="retour"
            href="#">
            <i className="bi bi-chevron-left mr-2"></i>
            <span>Retour accueil</span>
        </a>
    </div>

}
