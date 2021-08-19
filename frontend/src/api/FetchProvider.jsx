import React, {createContext, useMemo} from "react";

export const FetchContext = createContext(undefined);

export const FetchProvider = ({children}) => {
    const fetchProvider = useMemo(() => {
        return {
            headers: {
                "Content-Type": "application/json",
            },
        };
    }, []);

    return (
        <FetchContext.Provider value={fetchProvider}>
            {children}
        </FetchContext.Provider>
    );
}
