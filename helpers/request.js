import axios from 'axios';
import { commerceLayer } from '../config/index.js';

function makeAuthRequest(method, path, grantType, request, response) {
    axios({
        method: method,
        baseURL: commerceLayer.domain,
        url: path,
        data: {
            'grant_type': grantType,
            'client_id': commerceLayer.clientId,
            'scope': commerceLayer.euScope
        },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        request.session.accessToken = { ...res.data, last_saved: Date.now() };
        response.status(200).send({ message: 'Token successfully acquired' });
    }).catch((err) => {
        processErrorResponse(err, response, 'Failed to get access token');
    });
}

function makeBodilessAPIRequest(method, path, request, response, failureMessage) {
    axios({
        method: method,
        baseURL: commerceLayer.domain,
        url: path,
        headers: {
            'Accept': 'application/vnd.api+json',
            'Authorization': `Bearer ${request.session.accessToken.access_token}`
        }
    }).then((res) => {
        response.status(200).send(res.data.data);
    }).catch((err) => {
        processErrorResponse(err, response, failureMessage);
    });
}

function makeAPIRequestWithBody(method, path, body, additionalHeaders, request, response, failureMessage) {
    axios({
        method: method,
        baseURL: commerceLayer.domain,
        url: path,
        headers: {
            'Accept': 'application/vnd.api+json',
            'Authorization': `Bearer ${request.session.accessToken.access_token}`,
            ...additionalHeaders
        },
        data: body
    }).then((res) => {
        response.status(200).send(res.data.data);
    }).catch((err) => {
        processErrorResponse(err, response, failureMessage);
    });
}

function processErrorResponse(err, response, failureMessage) {
    if (err.response) {
        response.status(err.response.status).send({ error: err.response.data.errors, message: failureMessage });
    } else {
        response.status(500).send({ error: err.message, message: failureMessage });
    }
}

export { makeAuthRequest, makeBodilessAPIRequest, makeAPIRequestWithBody };