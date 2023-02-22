import {useAuth0} from "@auth0/auth0-react";
import {QueryKey, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {BACKEND_URL} from "./api";
import jwt_decode from "jwt-decode";

const CHAMP_EMAIL_TOKEN_AUTH0 = 'https://geneaplanner/email';

export const useQueryWithAuth = (queryKey: QueryKey, serviceUrl: string, enabled = true) => {
  const {getAccessTokenSilently} = useAuth0();
  return useQuery(queryKey, async () => {
      const token = await getAccessTokenSilently();
      const accessToken = jwt_decode(token) as any;
      const response = await fetch(
        `${BACKEND_URL}${serviceUrl.replace(/\[email\]/g, accessToken[CHAMP_EMAIL_TOKEN_AUTH0])}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    },
    {enabled}
  );
}

export const usePostMutationWithAuth = (serviceUrl: string, queriesToInvalidate: Array<string> = []) =>
  useMutationWithAuth('POST', serviceUrl, queriesToInvalidate);
export const usePutMutationWithAuth = (serviceUrl: string, queriesToInvalidate: Array<string> = []) =>
  useMutationWithAuth('PUT', serviceUrl, queriesToInvalidate);
export const usePatchMutationWithAuth = (serviceUrl: string, queriesToInvalidate: Array<string> = []) =>
  useMutationWithAuth('PATCH', serviceUrl, queriesToInvalidate);
export const useDeleteMutationWithAuth = (serviceUrl: string, queriesToInvalidate: Array<string> = []) =>
  useMutationWithAuth('DELETE', serviceUrl, queriesToInvalidate);

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const useMutationWithAuth = (method: Method, serviceUrl: string, queriesToInvalidate: Array<string> = []) => {
  const queryClient = useQueryClient();
  const {getAccessTokenSilently} = useAuth0();
  const {mutateAsync} = useMutation(async (body?: any) => {
    const token = await getAccessTokenSilently();
    const accessToken = jwt_decode(token) as any;
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
    if (response.status !== 204) {
      return response.json();
    }
  }, {
    onSuccess: () => {
      if (queriesToInvalidate.length > 0) {
        // @ts-ignore
        queriesToInvalidate.forEach(query => queryClient.invalidateQueries(query));
      }
    }
  });
  return mutateAsync;
}
