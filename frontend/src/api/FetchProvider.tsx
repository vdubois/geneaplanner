import React, {Component, createContext, FC, ReactNode, useMemo} from "react";

export const FetchContext = createContext(undefined);

interface FetchProviderProps {
    children: ReactNode;
}

// @ts-ignore
export const FetchProvider: FC<FetchProviderProps> = ({children}) => {
    const fetchProvider = useMemo(() => {
        return {
            headers: {
                "Content-Type": "application/json",
            },
        };
    }, []);

    // @ts-ignore
    return (<FetchContext.Provider value={fetchProvider}>
            {children}
        </FetchContext.Provider>
    );
}
