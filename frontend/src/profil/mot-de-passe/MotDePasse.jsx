import {Bouton} from "../../components/bouton/Bouton";

import axios from "axios";
import {clientId, domain} from "../../auth0";
import {useAuth0} from "@auth0/auth0-react";
import React, {useEffect, useState} from "react";
import {MessageDeConfirmation} from "../../components/message/MessageDeConfirmation";
import {Media} from "../../index";

export const MotDePasse = () => {
    const {user} = useAuth0();
    const [afficherSucces, setAfficherSucces] = useState(false);

    useEffect(() => {
        if (user) {
            user.email = user[`https://geneaplanner/email`];
        }
    }, [user]);

    const demanderUnChangementDuMotDePasse = async () => {
        const options = {
            method: 'POST',
            url: `https://${domain}/dbconnections/change_password`,
            headers: {
                'content-type': 'application/json',
            },
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

    return <div className='d-flex flex-column align-items-center'>
        <Media lessThan="sm">
            <h3 className='mb-2 texte-principale-3'>Mot de passe</h3>
        </Media>
        {afficherSucces && <MessageDeConfirmation libelle={'La demande de mot de passe a été envoyée à <strong>' + user.email + '</strong>. Veuillez vérifier vos emails.'}/>}
        <Bouton
            id='changement-mot-de-passe'
            libelle='Changer mon mot de passe'
            disabled={afficherSucces}
            variante='secondaire'
            onClick={demanderUnChangementDuMotDePasse}/>
    </div>
}
