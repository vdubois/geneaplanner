import React from "react";
import classNames from "classnames";
import './FamilyNode.css';
import {useNavigate} from "react-router-dom";

export const FamilyNode = React.memo(({ node, isRoot, onSubClick, style }) => {
    const navigateTo = useNavigate();

    return (
        <div className="root" style={style} title={node.id}>
            <div
                className={classNames(
                    'inner',
                    node.gender,
                    isRoot && 'isRoot',
                )}
                onClick={() => navigateTo('/recherche-d-individus/' + node.id)}
            >{node?.name}</div>
            {node.hasSubTree && (
                <div
                    className={classNames('sub', node.gender)}
                    onClick={() => onSubClick(node.id)}
                />
            )}
        </div>
    );
});