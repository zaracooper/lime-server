import axios from 'axios';
import { commerceLayer } from '../config/index.js';
import { GrantTypes } from './token.js';

function makeAuthRequest(method, path, grantType, request, response) {
    let data = {
        'grant_type': grantType,
        'client_id': commerceLayer.clientId,
        'scope': commerceLayer.euScope
    };

    switch (grantType) {
        case GrantTypes.ClientCredentials:
            break;
        case GrantTypes.Password:
            data['username'] = request.body.username;
            data['password'] = request.body.password;
            break;
        default:
            response.status(500).send({ message: 'Grant type is not valid.' });
            return;
    }

    axios({
        method: method,
        baseURL: commerceLayer.domain,
        url: path,
        data: data,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        switch (grantType) {
            case GrantTypes.ClientCredentials:
                request.session.clientToken = { ...res.data, last_saved: Date.now() };
            case GrantTypes.Password:
                request.session.customerToken = { ...res.data, last_saved: Date.now() };
        }

        response.status(200).send({ message: 'Token successfully acquired' });
    }).catch((err) => {
        console.log(err);
        processErrorResponse(err, response, 'Failed to get access token');
    });
}

function makeBodilessAPIRequest(method, path, params, request, response, failureMessage) {
    const token = request.session.customerToken || request.session.clientToken;

    axios({
        method: method,
        baseURL: commerceLayer.domain,
        url: path,
        params: params,
        headers: {
            'Accept': 'application/vnd.api+json',
            'Authorization': `Bearer ${token.access_token}`
        }
    }).then((res) => {
        response.status(200).send(res.data.data);
    }).catch((err) => {
        processErrorResponse(err, response, failureMessage);
    });
}

function makeAPIRequestWithBody(method, path, params, body, additionalHeaders, request, response, failureMessage) {
    const token = request.session.customerToken || request.session.clientToken;

    axios({
        method: method,
        baseURL: commerceLayer.domain,
        url: path,
        headers: {
            'Accept': 'application/vnd.api+json',
            'Authorization': `Bearer ${token.access_token}`,
            ...additionalHeaders
        },
        params: params,
        data: body
    }).then((res) => {
        response.status(200).send(res.data.data);
    }).catch((err) => {
        console.log(err);
        processErrorResponse(err, response, failureMessage);
    });
}

function processErrorResponse(err, response, failureMessage) {
    if (err.response) {
        response.status(err.response.status).send({ error: err.response.data, message: failureMessage });
    } else {
        response.status(500).send({ error: err.message, message: failureMessage });
    }
}

export { makeAuthRequest, makeBodilessAPIRequest, makeAPIRequestWithBody };