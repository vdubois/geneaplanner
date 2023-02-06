import {usePostMutationWithAuth, useQueryWithAuth} from "./react-query.hooks";

export const useEnregistrerGoogleMapsApiKey = () =>
    usePostMutationWithAuth(`/googlemaps/[email]`, ['googlemaps'])

export const useParametrageGoogleMapsApiKey = (enabled) => {
    const { isInitialLoading, error, data } = useQueryWithAuth(
        ["googlemaps"],
        `/googlemaps/[email]`,
        enabled
    );
    return {
        apiKeyEnCoursDeChargement: isInitialLoading,
        apiKeyEnErreur: error,
        apiKey: data
    };
}
