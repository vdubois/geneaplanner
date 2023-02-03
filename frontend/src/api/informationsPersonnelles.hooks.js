import {usePutMutationWithAuth, useQueryWithAuth} from "./react-query.hooks";

export const useModifierInformationsPersonnelles = () =>
    usePutMutationWithAuth(`/utilisateurs/[email]`, ['informationsPersonnelles'])

export const useInformationsPersonnelles = (enabled) => {
    const { isLoading, error, data } = useQueryWithAuth(
        "informationsPersonnelles",
        `/utilisateurs/[email]`,
        enabled
    );
    return {
        enCoursDeChargement: isLoading,
        enErreur: error,
        informationsPersonnelles: data
    };
}
