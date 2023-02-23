import {
    usePatchMutationWithAuth,
    usePostMutationWithAuth,
    useQueryWithAuth
} from "./react-query.hooks";

export const useConnexionFichiers = () =>
    usePostMutationWithAuth(`/fichiers/[email]`, ['fichiers'])

export const useParametrageFichiers = (enabled?: boolean) => {
    const { isInitialLoading, error, data } = useQueryWithAuth(
        ["fichiers"],
        `/fichiers/[email]`,
        enabled
    );
    return {
        parametrageFichiersEnCoursDeChargement: isInitialLoading,
        parametrageFichiersEnErreur: error,
        parametrageFichiers: data
    };
}

export const useFichiers = (identifiantIndividu: string, enabled?: boolean) => {
    const { isInitialLoading, error, data } = useQueryWithAuth(
        ["fichiersIndividu", identifiantIndividu],
        `/arbres/[email]/fichiers/${identifiantIndividu}`,
        enabled
    );
    return {
        fichiersEnCoursDeChargement: isInitialLoading,
        fichiersEnErreur: error,
        fichiers: data
    };
}

export const useModifierParametrageFichiers = () =>
    usePatchMutationWithAuth(`/fichiers/[email]`, ['fichiers'])
