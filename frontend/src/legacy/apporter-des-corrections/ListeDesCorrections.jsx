import {Button} from "@mui/material";
import {Add} from "@mui/icons-material";
import React from "react";
import './ListeDesCorrections.css';
import {Correction} from "./Correction";

export const ListeDesCorrections = ({corrections, setFenetreDeSaisieOuverte}) => {
    return (
        <div className="ListeDesCorrections">
            {corrections.map((correction, index) => <Correction key={index} correction={correction} />)}
            <div className="ListeDesCorrectionsActions">
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add/>}
                    onClick={() => setFenetreDeSaisieOuverte(true)}
                >Ajouter</Button>
            </div>
        </div>
    );
};
