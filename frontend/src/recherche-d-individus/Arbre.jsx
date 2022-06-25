import ReactFamilyTree from "react-family-tree";
import {FamilyNode} from "./FamilyNode";
import React, {useState} from "react";
import {Box, Tab, Tabs} from "@mui/material";
import {TabContext, TabPanel} from "@mui/lab";

export const Arbre = ({arbreGenealogique, racine}) => {
    const width = 220;
    const height = 80;
    const [value, setValue] = useState("1");

    return <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{flex: 1, height: '100%'}}>
        <TabContext value={value}>
            <Box display="flex" flexDirection="column" sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
                <Tabs value={value}>
                    <Tab label="Arbre généalogique" value="1" />
                </Tabs>
            </Box>
            <TabPanel value="1">
                {arbreGenealogique && arbreGenealogique.length > 0 && <ReactFamilyTree
                    nodes={arbreGenealogique}
                    rootId={racine}
                    width={width}
                    height={height}
                    className="tree"
                    renderNode={(node) => (
                        <FamilyNode
                            key={node.id}
                            node={node}
                            isRoot={node.id === racine}
                            onSubClick={() => {
                            }}
                            style={{
                                width,
                                height,
                                transform: `translate(${node.left * (width / 2)}px, ${node.top * (height / 2)}px)`,
                            }}
                        />
                    )}
                />}
            </TabPanel>
        </TabContext>
    </Box>;
}