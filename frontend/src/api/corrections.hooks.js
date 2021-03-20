import {useDeleteMutationWithAuth, usePostMutationWithAuth, useQueryWithAuth} from "./react-query.hooks";

export const useCorrections = () => {
    const {isLoading, error, data} = useQueryWithAuth(
        "corrections",
        `/utilisateurs/[email]/corrections`
    );
    return {
        correctionsEnCoursDeChargement: isLoading,
        correctionsEnErreur: error,
        corrections: data
    };
};

export const useAjouterCorrection = () =>
    usePostMutationWithAuth(`/utilisateurs/[email]/corrections`, ['corrections']);

export const useValiderCorrection = (identifiantCorrection) =>
    useDeleteMutationWithAuth(`/utilisateurs/[email]/corrections/${identifiantCorrection}`, ['corrections']);
