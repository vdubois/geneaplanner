import {
  useDeleteMutationWithAuth,
  usePostMutationWithAuth,
  usePutMutationWithAuth,
  useQueryWithAuth
} from './react-query.hooks';

export const useAdminArchives = (enabled?: boolean) => {
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

export const useAdminModifierArchive = (identifiantArchive: string) =>
  usePutMutationWithAuth(`/admin/modeles-archives/${identifiantArchive}`, ['archives-admin']);

export const useAdminSupprimerArchive = (identifiantArchive: string) =>
  useDeleteMutationWithAuth(`/admin/modeles-archives/${identifiantArchive}`, ['archives-admin']);
