import {usePutMutationWithAuth, useQueryWithAuth} from "./react-query.hooks";

export const useIndividus = (enabled) => {
    const { isLoading, error, data } = useQueryWithAuth(
        "individus",
        `/arbres/[email]`,
        enabled
    );
    return {
        individusEnCoursDeChargement: isLoading,
        individusEnErreur: error,
        individus: data
    };
}

export const usePublierArbre = () =>
    usePutMutationWithAuth(`/arbres/[email]`, ['individus'])
