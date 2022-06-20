import {
    useDeleteMutationWithAuth,
    usePatchMutationWithAuth, usePostMutationWithAuth,
    usePutMutationWithAuth,
    useQueryWithAuth
} from "./react-query.hooks";

export const useIndividus = (enabled) => {
    const { isLoading, error, data } = useQueryWithAuth(
        "individus",
        `/arbres/[email]`,
        enabled
    );
    return {
        individusEnCoursDeChargement: isLoading,
        individusEnErreur: error,
        arbre: data || {}
    };
}

export const useArbre = (individu, enabled) => {
    const { isLoading, error, data } = useQueryWithAuth(
        "arbre",
        `/arbres/[email]/detail/${individu}`,
        enabled
    );
    return {
        arbreGenealogiqueEnCoursDeChargement: isLoading,
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
    const { isLoading, error, data } = useQueryWithAuth(
      ["individu", identifiantIndividu],
      `/arbres/[email]/individus/${identifiantIndividu}`
    );
    return {
        individuEnCoursDeChargement: isLoading,
        individuEnErreur: error,
        individu: data
    };
}
