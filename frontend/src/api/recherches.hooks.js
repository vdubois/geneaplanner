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

export const useAjouterRechercheDIndividu = () =>
  usePostMutationWithAuth(`/utilisateurs/[email]/recherches`, ['recherches']);
