import {useDeleteMutationWithAuth, usePostMutationWithAuth, useQueryWithAuth} from './react-query.hooks';

export const useRecherches = (enabled?: boolean) => {
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

export const useSupprimerRecherche = (identifiantIndividu: string) =>
  useDeleteMutationWithAuth(`/utilisateurs/[email]/recherches/${identifiantIndividu}`, ['recherches']);

export const useAjouterRechercheDIndividu = (identifiantIndividu: string) =>
  usePostMutationWithAuth(`/utilisateurs/[email]/recherches/${identifiantIndividu}/recherches`, ['recherches']);

export const useSupprimerRechercheDIndividu = (identifiantIndividu: string, identifiantRecherche: string) =>
  useDeleteMutationWithAuth(`/utilisateurs/[email]/recherches/${identifiantIndividu}/recherches/${identifiantRecherche}`, ['recherches']);

export const useAjouterNoteDIndividu = (identifiantIndividu: string) =>
  usePostMutationWithAuth(`/utilisateurs/[email]/recherches/${identifiantIndividu}/notes`, ['recherches']);

export const useSupprimerNoteDIndividu = (identifiantIndividu: string, identifiantNote: string) =>
  useDeleteMutationWithAuth(`/utilisateurs/[email]/recherches/${identifiantIndividu}/notes/${identifiantNote}`, ['recherches']);
