import {Bouton} from "../../components/bouton/Bouton";

import axios from "axios";
import {clientId, domain} from "../../auth0";
import {useAuth0} from "@auth0/auth0-react";
import {Alert, Snackbar} from "@mui/material";
import React, {useState} from "react";
import {MessageDeConfirmation} from "../../components/message/MessageDeConfirmation";

export const MotDePasse = () => {
    const {user} = useAuth0();
    const [afficherSucces, setAfficherSucces] = useState(false);

    const demanderUnChangementDuMotDePasse = async () => {
        const options = {
            method: 'POST',
            url: `https://${domain}/dbconnections/change_password`,
            headers: {'content-type': 'application/json'},
            data: {
                client_id: clientId,
                email: user.email,
                connection: 'Username-Password-Authentication'
            }
        };

        try {
            const response = await axios.request(options);
            setAfficherSucces(true);
        } catch (error) {
            console.error(error);
        }
    }

    return <div>
        {afficherSucces && <MessageDeConfirmation libelle={'La demande de mot de passe a été envoyée à <strong>' + user.email + '</strong>. Veuillez vérifier vos emails.'}/>}
        <Bouton
            id='changement-mot-de-passe'
            libelle='Changer mon mot de passe'
            disabled={afficherSucces}
            variante='secondaire'
            onClick={demanderUnChangementDuMotDePasse}/>
    </div>
}
