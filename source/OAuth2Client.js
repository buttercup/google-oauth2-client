import { stringify } from "query-string";
import { request } from "cowl";
import EventEmitter from "eventemitter3";
import {
    GOOGLE_OAUTH2_AUTH_BASE_URL,
    GOOGLE_OAUTH2_TOKEN_URL
} from "./symbols";

export default class OAuth2Client extends EventEmitter {
    constructor(clientID, clientSecret, oauthRedirectURL) {
        super();
        this._clientID = clientID;
        this._clientSecret = clientSecret;
        this._redirectURL = oauthRedirectURL;
        this._accessToken = null;
        this._refreshToken = null;
        this._refreshTokenPromises = new Map();
    }

    generateAuthUrl(config) {
        const {
            access_type,
            scope: rawScope,
            prompt,
            response_type = "code"
        } = config;
        const scope = Array.isArray(rawScope) ? rawScope.join(" ") : rawScope;
        const opts = {
            access_type,
            scope,
            prompt,
            response_type
        };
        return `${GOOGLE_OAUTH2_AUTH_BASE_URL}?${stringify(opts)}`;
    }

    refreshToken(refreshToken) {
        if (!refreshToken) {
            return this.refreshTokenNoCache(refreshToken);
        }
        if (this._refreshTokenPromises.has(refreshToken)) {
            return this._refreshTokenPromises.get(refreshToken);
        }
        const refreshTokenPromise = this
            .refreshTokenNoCache(refreshToken)
            .then(rt => {
                this._refreshTokenPromises.delete(refreshToken);
                return rt;
            })
            .catch(err => {
                this._refreshTokenPromises.delete(refreshToken);
                throw err;
            });
        this._refreshTokenPromises.set(refreshToken, refreshTokenPromise);
        return refreshTokenPromise;
    }

    async refreshTokenNoCache(refreshToken) {
        const data = {
            refresh_token: refreshToken,
            client_id: this._clientID,
            client_secret: this._clientSecret,
            grant_type: "refresh_token",
        };
        const res = await request({
            url: GOOGLE_OAUTH2_TOKEN_URL,
            method: "POST",
            body: stringify(data),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        const { data: tokens } = res;
        if (tokens && tokens.expires_in) {
            tokens.expiry_date = new Date().getTime() + tokens.expires_in * 1000;
            delete tokens.expires_in;
        }
        this.emit("tokens", tokens);
        return {
            tokens,
            res
        };
    }

    setCredentials(accessToken, refreshToken) {
        this._accessToken = accessToken;
        if (refreshToken) {
            this._refreshToken = refreshToken;
        }
    }
}
