import auth0 from '../auth0';

function hasNoContent(response) {
    return response.status === 204 || response.status === 403;
}

const BACKEND_URL = 'https://8yorb33jo9.execute-api.eu-west-3.amazonaws.com';

export async function callApi(options) {
    const { method, endpoint, query, body } = options;

    const request = {
        headers: {
            Accept: "application/json"
        }
    };

    if (method) request.method = method;

    const token = await auth0.getTokenSilently();
    request.headers["Authorization"] = "Bearer " + token

    if (body) {
        request.headers["Content-Type"] = "application/json";
        request.body = JSON.stringify(body);
    }

    let url = BACKEND_URL + endpoint;

    if (query) url += "?" + query;

    let response = await fetch(url, request);

    let json;
    if (hasNoContent(response)) {
        json = undefined;
    } else {
        json = await response.json();
    }

    if (!response.ok) {
        if (response.status === 403) {
            const error = await response.text();
            throw Error(error);
        } else if (json) {
            throw Error(json);
        } else {
            throw Error(url + request.toString());
        }
    }

    return json;
}
