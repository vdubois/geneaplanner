import {
  useDeleteMutationWithAuth,
  usePostMutationWithAuth,
  usePutMutationWithAuth,
  useQueryWithAuth
} from './react-query.hooks';

export const useArchives = (enabled) => {
  const { isInitialLoading, error, data } = useQueryWithAuth(
    ["archives"],
    `/utilisateurs/[email]/archives`,
    enabled
  );
  return {
    archivesEnCoursDeChargement: isInitialLoading,
    archivesEnErreur: error,
    archives: data
  };
}

export const useAjouterArchive = () =>
  usePostMutationWithAuth(`/utilisateurs/[email]/archives`, ['archives']);

export const useModifierArchive = (identifiantArchive) =>
  usePutMutationWithAuth(`/utilisateurs/[email]/archives/${identifiantArchive}`, ['archives']);

export const useSupprimerArchive = (identifiantArchive) =>
  useDeleteMutationWithAuth(`/utilisateurs/[email]/archives/${identifiantArchive}`, ['archives']);

export const useDetailArchives = (identifiantArchives, enabled) => {
  const { isInitialLoading, error, data } = useQueryWithAuth(
    ["archives", identifiantArchives],
    `/utilisateurs/[email]/archives/${identifiantArchives}`,
    enabled
  );
  return {
    archivesEnCoursDeChargement: isInitialLoading,
    archivesEnErreur: error,
    archives: data
  };
}

export const useAjouterRegistreAuxArchives = (identifiantArchives) =>
  usePostMutationWithAuth(`/utilisateurs/[email]/archives/${identifiantArchives}/registres`, ['archives', identifiantArchives]);
