import './Bandeau.scss';
import {FC} from "react";

interface BandeauProps {
    retournerVersLaPageDAccueil: () => void;
    titre: string;
    nomComplet: string;
    accederAuProfil: () => void;
    meDeconnecter: () => void;
}

export const Bandeau: FC<BandeauProps> = ({retournerVersLaPageDAccueil, titre, nomComplet, accederAuProfil, meDeconnecter}) => {
    return <header>
        <div className="content">
            <div className="top">
                <img className="logo"
                onClick={retournerVersLaPageDAccueil}
                alt="myPrimobox"
                src="/logo.png"/>
            </div>
            <div id="titre-page">
                <span className="message">{titre}</span>
            </div>
            <div className="top right">
                <div className="actions">
                    <a onClick={accederAuProfil} href="#" id="menu-profil">
                        <span id="menu-profil-nom">{nomComplet}</span>
                        <div className="profil-icone"><span className="profil-icone"></span></div>
                    </a>
                    <div id="bouton-deconnexion-responsive" onClick={meDeconnecter}><img src="/log-out.svg" alt="logout"/></div>
                    <button id="deconnexion" className="button">
                        <span className="icone-deconnexion"></span>
                        <span onClick={meDeconnecter}>Me déconnecter</span>
                    </button>
                </div>
            </div>
        </div>
    </header>;
}
