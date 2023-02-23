import React from "react";
import classNames from "classnames";
import './FamilyNode.css';
import {useNavigate} from "react-router-dom";
import deces from '/tomb.png';
import naissance from '/calendar.png';
import bapteme from '/cross.png';
import {Box} from "@mui/material";
import {dateAsShortString, dateAsString} from "../../dates";
import {capitalize} from "../../strings";

export const FamilyNode = React.memo(({ node, isRoot, onSubClick, style }) => {
    const navigateTo = useNavigate();

    const title = (evenement) => {
        if (evenement.date) {
            return capitalize(dateAsString(evenement.date)) + (evenement.lieu && ` à ${evenement.lieu}`);
        }
        return 'A ' + evenement.lieu;
    };

    return (
        <div className="root" style={style}>
            <div
                className={classNames(
                    'inner',
                    node.gender,
                    isRoot && 'isRoot',
                )}
            ><Box display="flex" onClick={() => navigateTo('/recherche-d-individus/' + node.id)} sx={{cursor: 'pointer'}}>{node?.name}</Box>
                {node?.naissance && node?.naissance?.date && <Box display="flex" gap="6px" alignItems="center" title={title(node.naissance)}>
                    <img
                        src={naissance}
                        style={{
                            width: '16px',
                            height: '16px'
                        }}/>
                    <span>{dateAsShortString(node.naissance.date)}</span>
                </Box>}
                {!node?.naissance && node?.bapteme && node?.bapteme?.date && <Box display="flex" gap="6px" alignItems="center" title={title(node.bapteme)}>
                    <img
                        src={bapteme}
                        style={{
                            width: '16px',
                            height: '16px'
                        }}/>
                    <span>{dateAsShortString(node.bapteme.date)}</span>
                </Box>}
                {node?.deces && node?.deces?.date && <Box display="flex" gap="6px" alignItems="center" title={title(node.deces)}>
                    <img
                        src={deces}
                        style={{
                            width: '16px',
                            height: '16px'
                        }}/>
                    <span>{dateAsShortString(node.deces.date)}</span>
                </Box>}
            </div>
            {node.hasSubTree && (
                <div
                    className={classNames('sub', node.gender)}
                    onClick={() => onSubClick(node.id)}
                />
            )}
        </div>
    );
});
