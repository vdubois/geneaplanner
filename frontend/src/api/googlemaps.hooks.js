import {usePostMutationWithAuth, useQueryWithAuth} from "./react-query.hooks";

export const useEnregistrerGoogleMapsApiKey = () =>
    usePostMutationWithAuth(`/googlemaps/[email]`, ['googlemaps'])

export const useParametrageGoogleMapsApiKey = (enabled) => {
    const { isLoading, error, data } = useQueryWithAuth(
        "googlemaps",
        `/googlemaps/[email]`,
        enabled
    );
    return {
        apiKeyEnCoursDeChargement: isLoading,
        apiKeyEnErreur: error,
        apiKey: data
    };
}
