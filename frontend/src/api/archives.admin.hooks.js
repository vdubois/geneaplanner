import {
  useDeleteMutationWithAuth,
  usePostMutationWithAuth,
  usePutMutationWithAuth,
  useQueryWithAuth
} from './react-query.hooks';

export const useAdminArchives = (enabled) => {
  const { isLoading, error, data } = useQueryWithAuth(
    "archives-admin",
    `/utilisateurs/[email]/modeles-archives`,
    enabled
  );
  return {
    archivesEnCoursDeChargement: isLoading,
    archivesEnErreur: error,
    archives: data
  };
}

export const useAdminAjouterArchive = () =>
  usePostMutationWithAuth(`/admin/archives`, ['archives-admin']);

export const useAdminModifierArchive = (identifiantArchive) =>
  usePutMutationWithAuth(`/admin/archives/${identifiantArchive}`, ['archives-admin']);

export const useAdminSupprimerArchive = (identifiantArchive) =>
  useDeleteMutationWithAuth(`/admin/archives/${identifiantArchive}`, ['archives-admin']);
