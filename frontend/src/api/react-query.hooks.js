import {useAuth0} from "@auth0/auth0-react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {BACKEND_URL} from "./api";
import jwt_decode from "jwt-decode";

const CHAMP_EMAIL_TOKEN_AUTH0 = 'https://geneaplanner/email';

export const useQueryWithAuth = (queryKey, serviceUrl, enabled = true) => {
  const {getAccessTokenSilently} = useAuth0();
  return useQuery(queryKey, async () => {
      const token = await getAccessTokenSilently();
      const accessToken = jwt_decode(token);
      const response = await fetch(
        `${BACKEND_URL}${serviceUrl.replace(/\[email\]/g, accessToken[CHAMP_EMAIL_TOKEN_AUTH0])}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      if (!response.ok) {
        throw new Error(response.json());
      }
      return response.json();
    },
    {enabled}
  );
}

export const usePostMutationWithAuth = (serviceUrl, queriesToInvalidate = []) =>
  useMutationWithAuth('POST', serviceUrl, queriesToInvalidate);
export const usePutMutationWithAuth = (serviceUrl, queriesToInvalidate = []) =>
  useMutationWithAuth('PUT', serviceUrl, queriesToInvalidate);
export const usePatchMutationWithAuth = (serviceUrl, queriesToInvalidate = []) =>
  useMutationWithAuth('PATCH', serviceUrl, queriesToInvalidate);
export const useDeleteMutationWithAuth = (serviceUrl, queriesToInvalidate = []) =>
  useMutationWithAuth('DELETE', serviceUrl, queriesToInvalidate);

const useMutationWithAuth = (method, serviceUrl, queriesToInvalidate = []) => {
  const queryClient = useQueryClient();
  const {getAccessTokenSilently} = useAuth0();
  const {mutateAsync} = useMutation(async body => {
    const token = await getAccessTokenSilently();
    const accessToken = jwt_decode(token);
    const response = await fetch(
      `${BACKEND_URL}${serviceUrl.replace(/\[email\]/g, accessToken[CHAMP_EMAIL_TOKEN_AUTH0])}`,
      {
        method,
        body: JSON.stringify(body),
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    if (!response.ok) {
      const json = await response.json();
      throw new Error(json.message);
    }
    if (!response.status === 204) {
      return response.json();
    }
  }, {
    onSuccess: () => {
      if (queriesToInvalidate.length > 0) {
        queriesToInvalidate.forEach(query => queryClient.invalidateQueries(query));
      }
    }
  });
  return mutateAsync;
}
