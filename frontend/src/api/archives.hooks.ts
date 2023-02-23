import {
  useDeleteMutationWithAuth,
  usePostMutationWithAuth,
  usePutMutationWithAuth,
  useQueryWithAuth
} from './react-query.hooks';

export const useArchives = (enabled?: boolean) => {
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

export const useModifierArchive = (identifiantArchive: string) =>
  usePutMutationWithAuth(`/utilisateurs/[email]/archives/${identifiantArchive}`, ['archives']);

export const useSupprimerArchive = (identifiantArchive: string) =>
  useDeleteMutationWithAuth(`/utilisateurs/[email]/archives/${identifiantArchive}`, ['archives']);

export const useDetailArchives = (identifiantArchives: string, enabled?: boolean) => {
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

export const useAjouterRegistreAuxArchives = (identifiantArchives: string) =>
  usePostMutationWithAuth(`/utilisateurs/[email]/archives/${identifiantArchives}/registres`, ['archives', identifiantArchives]);
