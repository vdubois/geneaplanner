import {Box, Tab, Tabs} from "@mui/material";
import {TabContext, TabPanel} from "@mui/lab";
import {useState} from "react";
import {FicheDetaillee} from "./FicheDetaillee";
import {RepartitionGeographique} from "./RepartitionGeographique";
import {Documents} from "./Documents";

export const OngletsArbre = ({individu}) => {
    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" sx={{flex: 1, height: '100%', width: '100%'}}>
        <TabContext value={value}>
            <Box display="flex" flexDirection="column" sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Fiche détaillée" value="1" />
                    <Tab label="Répartition géographique" value="2" />
                    <Tab label="Documents" value="3" />
                </Tabs>
            </Box>
            <TabPanel value="1">
                <FicheDetaillee identifiantIndividu={individu} />
            </TabPanel>
            <TabPanel value="2">
                <RepartitionGeographique identifiantIndividu={individu} />
            </TabPanel>
            <TabPanel value="3">
                <Documents individu={individu} />
            </TabPanel>
        </TabContext>
    </Box>;
}