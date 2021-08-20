import {usePostMutationWithAuth, useQueryWithAuth} from './react-query.hooks';

export const useRecherches = (enabled) => {
  const { isLoading, error, data } = useQueryWithAuth(
    "recherches",
    `/utilisateurs/[email]/recherches`,
    enabled
  );
  return {
    recherchesEnCoursDeChargement: isLoading,
    recherchesEnErreur: error,
    recherches: data
  };
}

export const useAjouterRecherche = () =>
  usePostMutationWithAuth(`/utilisateurs/[email]/recherches`, ['recherches']);

export const useAjouterRechercheDIndividu = (identifiantIndividu) =>
  usePostMutationWithAuth(`/utilisateurs/[email]/recherches/${identifiantIndividu}/recherches`, ['recherches']);

export const useAjouterNoteDIndividu = (identifiantIndividu) =>
  usePostMutationWithAuth(`/utilisateurs/[email]/recherches/${identifiantIndividu}/notes`, ['recherches']);
