import dayjs from 'dayjs';

class AccessToken {
    value;
    type;
    expiresIn;
    scope;
    createdAt;
    lastSaved;

    constructor(contents) {
        this.value = contents.access_token;
        this.type = contents.token_type;
        this.expiresIn = contents.expires_in;
        this.scope = contents.scope;
        this.createdAt = contents.created_at;
        this.lastSaved = contents.last_saved;
    }

    isValid() {
        return dayjs(this.lastSaved).add(this.expiresIn, 's').isAfter(dayjs());
    }
}

const GrantTypes = {
    ClientCredentials: 'client_credentials',
    Password: 'password',
    RefreshToken: 'refresh_token',
    AuthorizationCode: 'authorization_code'
};

export { AccessToken, GrantTypes };