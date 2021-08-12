import React from "react";
import './BarreDeNavigation.css';
import {useHistory} from "react-router-dom";

export const Titre = () => {
    let history = useHistory();

    return (
        <div
            className="AppBarTitre"
            onClick={() => history.push('/')}>
            <img
                src="logo.png"
                alt="GénéaPlanner"
                className="AppTitre"/>
        </div>
    );

};

