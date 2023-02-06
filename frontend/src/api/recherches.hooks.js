import {useDeleteMutationWithAuth, usePostMutationWithAuth, useQueryWithAuth} from './react-query.hooks';

export const useRecherches = (enabled) => {
  const { isInitialLoading, error, data } = useQueryWithAuth(
    ["recherches"],
    `/utilisateurs/[email]/recherches`,
    enabled
  );
  return {
    recherchesEnCoursDeChargement: isInitialLoading,
    recherchesEnErreur: error,
    recherches: data
  };
}

export const useAjouterRecherche = () =>
  usePostMutationWithAuth(`/utilisateurs/[email]/recherches`, ['recherches']);

export const useSupprimerRecherche = (identifiantIndividu) =>
  useDeleteMutationWithAuth(`/utilisateurs/[email]/recherches/${identifiantIndividu}`, ['recherches']);

export const useAjouterRechercheDIndividu = (identifiantIndividu) =>
  usePostMutationWithAuth(`/utilisateurs/[email]/recherches/${identifiantIndividu}/recherches`, ['recherches']);

export const useSupprimerRechercheDIndividu = (identifiantIndividu, identifiantRecherche) =>
  useDeleteMutationWithAuth(`/utilisateurs/[email]/recherches/${identifiantIndividu}/recherches/${identifiantRecherche}`, ['recherches']);

export const useAjouterNoteDIndividu = (identifiantIndividu) =>
  usePostMutationWithAuth(`/utilisateurs/[email]/recherches/${identifiantIndividu}/notes`, ['recherches']);

export const useSupprimerNoteDIndividu = (identifiantIndividu, identifiantNote) =>
  useDeleteMutationWithAuth(`/utilisateurs/[email]/recherches/${identifiantIndividu}/notes/${identifiantNote}`, ['recherches']);
