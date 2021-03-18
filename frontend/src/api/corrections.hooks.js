import {useQueryWithAuth} from "./react-query.hooks";

export const useCorrections = () => {
    const { isLoading, error, data } = useQueryWithAuth(
        "corrections",
        `/utilisateurs/[email]/corrections`
    );
    return {
        correctionsEnCoursDeChargement: isLoading,
        correctionsEnErreur: error,
        corrections: data
    };
}
