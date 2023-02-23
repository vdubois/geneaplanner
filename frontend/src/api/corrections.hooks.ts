import {useDeleteMutationWithAuth, usePostMutationWithAuth, useQueryWithAuth} from "./react-query.hooks";

export const useCorrections = () => {
    const {isInitialLoading, isFetching, error, data} = useQueryWithAuth(
        ["corrections"],
        `/utilisateurs/[email]/corrections`
    );
    return {
        correctionsEnCoursDeChargement: isInitialLoading || isFetching,
        correctionsEnErreur: error,
        corrections: data
    };
};

export const useAjouterCorrection = () =>
    usePostMutationWithAuth(`/utilisateurs/[email]/corrections`, ['corrections']);

export const useValiderCorrection = (identifiantCorrection: string) =>
    useDeleteMutationWithAuth(`/utilisateurs/[email]/corrections/${identifiantCorrection}`, ['corrections']);
