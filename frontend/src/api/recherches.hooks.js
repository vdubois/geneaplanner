import {useQueryWithAuth} from './react-query.hooks';

export const useRecherches = () => {
  const { isLoading, error, data } = useQueryWithAuth(
    "recherches",
    `/utilisateurs/[email]/recherches`
  );
  return {
    recherchesEnCoursDeChargement: isLoading,
    recherchesEnErreur: error,
    recherches: data
  };
}
