import {Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import './RechercheDIndividus.css';
import {PinchZoomPan} from "./PinchZoomSpan";
import ReactFamilyTree from 'react-family-tree';
import {FamilyNode} from "./FamilyNode";
import {useLocation, useParams} from "react-router-dom";
import jwt_decode from "jwt-decode";
import {BACKEND_URL} from "../api/api";

export const RechercheDIndividus = () => {
    const {getAccessTokenSilently} = useAuth0();

    let {racine} = useParams();
    const location = useLocation();
    const WIDTH = 220;
    const HEIGHT = 80;
    const [rootId, setRootId] = useState('');
    const [arbreGenealogique, setArbreGenealogique] = useState(null);
    const [nomRacine, setNomRacine] = useState(null);

    useEffect(() => {
        if (arbreGenealogique?.length > 0) {
            setNomRacine(arbreGenealogique.find(individu => individu.id === racine).name);
        }
    }, [arbreGenealogique]);

    useEffect(() => {
        const fetchArbre = async () => {
            const CHAMP_EMAIL_TOKEN_AUTH0 = 'https://geneaplanner/email';
            const token = await getAccessTokenSilently();
            const accessToken = jwt_decode(token);
            const response = await fetch(
                `${BACKEND_URL}/arbres/${accessToken[CHAMP_EMAIL_TOKEN_AUTH0]}/detail/@${racine}@`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            if (!response.ok) {
                throw new Error(response.json());
            }
            setArbreGenealogique(await response.json());
        }
        fetchArbre();
    }, [racine, location]);

    return <div className='RechercheDIndividus'>
        {nomRacine && <Typography variant="h4" sx={{textAlign: 'center'}}>Arbre généalogique de {nomRacine}</Typography>}
        <PinchZoomPan
            min={0.5}
            max={2.5}
            captureWheel
            className="wrapper"
        >
            {arbreGenealogique && arbreGenealogique.length > 0 && <ReactFamilyTree
                nodes={arbreGenealogique}
                rootId={racine}
                width={WIDTH}
                height={HEIGHT}
                className="tree"
                renderNode={(node) => (
                    <FamilyNode
                        key={node.id}
                        node={node}
                        isRoot={node.id === rootId}
                        onSubClick={setRootId}
                        style={{
                            width: WIDTH,
                            height: HEIGHT,
                            transform: `translate(${node.left * (WIDTH / 2)}px, ${node.top * (HEIGHT / 2)}px)`,
                        }}
                    />
                )}
            />}
        </PinchZoomPan>
    </div>;
}
