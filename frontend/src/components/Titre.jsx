import React from "react";
import './BarreDeNavigation.css';
import {useNavigate} from "react-router-dom";

export const Titre = () => {
    let navigateTo = useNavigate();

    return (
        <div
            className="AppBarTitre"
            onClick={() => navigateTo('/')}>
            <img
                src="logo.png"
                alt="GénéaPlanner"
                className="AppTitre"/>
        </div>
    );

};

