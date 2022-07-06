import {
    usePatchMutationWithAuth,
    usePostMutationWithAuth,
    useQueryWithAuth
} from "./react-query.hooks";

export const useConnexionFichiers = () =>
    usePostMutationWithAuth(`/fichiers/[email]`, ['fichiers'])

export const useParametrageFichiers = (enabled) => {
    const { isLoading, error, data } = useQueryWithAuth(
        "fichiers",
        `/fichiers/[email]`,
        enabled
    );
    return {
        parametrageFichiersEnCoursDeChargement: isLoading,
        parametrageFichiersEnErreur: error,
        parametrageFichiers: data
    };
}

export const useFichiers = (identifiantIndividu, enabled) => {
    const { isLoading, error, data } = useQueryWithAuth(
        ["fichiersIndividu", identifiantIndividu],
        `/arbres/[email]/fichiers/${identifiantIndividu}`,
        enabled
    );
    return {
        fichiersEnCoursDeChargement: isLoading,
        fichiersEnErreur: error,
        fichiers: data
    };
}

export const useModifierParametrageFichiers = () =>
    usePatchMutationWithAuth(`/fichiers/[email]`, ['fichiers'])