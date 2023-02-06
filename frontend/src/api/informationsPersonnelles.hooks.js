import {usePutMutationWithAuth, useQueryWithAuth} from "./react-query.hooks";

export const useModifierInformationsPersonnelles = () =>
    usePutMutationWithAuth(`/utilisateurs/[email]`, ['informationsPersonnelles'])

export const useInformationsPersonnelles = (enabled) => {
    const { isInitialLoading, error, data } = useQueryWithAuth(
        ["informationsPersonnelles"],
        `/utilisateurs/[email]`,
        enabled
    );
    return {
        enCoursDeChargement: isInitialLoading,
        enErreur: error,
        informationsPersonnelles: data
    };
}
