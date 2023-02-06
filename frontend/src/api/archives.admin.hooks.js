import {
  useDeleteMutationWithAuth,
  usePostMutationWithAuth,
  usePutMutationWithAuth,
  useQueryWithAuth
} from './react-query.hooks';

export const useAdminArchives = (enabled) => {
  const { isInitialLoading, error, data } = useQueryWithAuth(
    ["archives-admin"],
    `/utilisateurs/[email]/modeles-archives`,
    enabled
  );
  return {
    archivesEnCoursDeChargement: isInitialLoading,
    archivesEnErreur: error,
    archives: data
  };
}

export const useAdminAjouterArchive = () =>
  usePostMutationWithAuth(`/admin/modeles-archives`, ['archives-admin']);

export const useAdminModifierArchive = (identifiantArchive) =>
  usePutMutationWithAuth(`/admin/modeles-archives/${identifiantArchive}`, ['archives-admin']);

export const useAdminSupprimerArchive = (identifiantArchive) =>
  useDeleteMutationWithAuth(`/admin/modeles-archives/${identifiantArchive}`, ['archives-admin']);
