import {
    useDeleteMutationWithAuth,
    usePatchMutationWithAuth, usePostMutationWithAuth,
    usePutMutationWithAuth,
    useQueryWithAuth
} from "./react-query.hooks";

export const useIndividus = (enabled) => {
    const { isInitialLoading, error, data, isFetching} = useQueryWithAuth(
        ["individus"],
        `/arbres/[email]`,
        enabled
    );
    return {
        individusEnCoursDeChargement: isInitialLoading || isFetching,
        individusEnErreur: error,
        arbre: data || {}
    };
}

export const useArbre = (individu, enabled) => {
    const { isInitialLoading, error, data } = useQueryWithAuth(
        ["arbre"],
        `/arbres/[email]/detail/${individu}`,
        enabled
    );
    return {
        arbreGenealogiqueEnCoursDeChargement: isInitialLoading,
        arbreGenealogiqueEnErreur: error,
        arbreGenealogique: data || []
    };
}

export const usePublierArbre = () =>
    usePutMutationWithAuth(`/arbres/[email]`, ['individus'])

export const usePublierFichiersArbre = () =>
    usePostMutationWithAuth(`/arbres/[email]/fichiers`, [])

export const usePublierRacineDeLArbre = () =>
    usePatchMutationWithAuth(`/arbres/[email]`, ['individus'])

export const useSupprimerLArbre = () =>
    useDeleteMutationWithAuth(`/arbres/[email]`, ['individus'])

export const useIndividu = (identifiantIndividu) => {
    const { isInitialLoading, error, data } = useQueryWithAuth(
      ["individu", identifiantIndividu],
      `/arbres/[email]/individus/${identifiantIndividu}`
    );
    return {
        individuEnCoursDeChargement: isInitialLoading,
        individuEnErreur: error,
        individu: data
    };
}
