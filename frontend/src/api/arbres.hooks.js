import {usePutMutationWithAuth, useQueryWithAuth} from "./react-query.hooks";

export const useIndividus = () => {
    const { isLoading, error, data } = useQueryWithAuth(
        "individus",
        `/arbres/[email]`
    );
    return {
        individusEnCoursDeChargement: isLoading,
        individusEnErreur: error,
        individus: data
    };
}

export const usePublierArbre = () => {
    return usePutMutationWithAuth(`/arbres/[email]`, ['individus']);
}
