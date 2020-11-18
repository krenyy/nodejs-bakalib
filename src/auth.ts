import LoginModule from "./modules/login.js";

export default class Auth {
    _initializing: boolean;
    _initialized: boolean;
    _emitter: EventTarget;

    _url: string;
    _ttl: number;
    _accessToken: string;
    _accessTokenLastUpdate: number;
    _refreshToken: string;

    constructor() {
        this._emitter = new EventTarget();
    }

    get token(): Promise<string> {
        if (!this._initialized) {
            if (!this._initializing)
                throw new Error("Authentication agent is not initialized!");
            return new Promise<string>((resolve) => {
                this._emitter.addEventListener("initialized", () => {
                    resolve(this._accessToken);
                });
            });
        } else {
            if (Date.now() - this._accessTokenLastUpdate >= this._ttl * 1000)
                this._renewAccessToken(null, null, this._refreshToken).then();
            return Promise.resolve(this._accessToken);
        }
    }

    async initialize(
        url: string,
        username: string = null,
        password: string = null,
        refreshToken: string = null
    ) {
        this._url = url;

        this._initializing = true;
        this._initialized = false;

        await this._renewAccessToken(username, password, refreshToken);

        this._initializing = false;
        this._initialized = true;

        this._emitter.dispatchEvent(new Event("initialized"));
    }

    async _renewAccessToken(
        username: string = null,
        password: string = null,
        refreshToken: string = null
    ) {
        const login = await LoginModule.get(this._url, {
            client_id: "ANDR",
            grant_type: refreshToken ? "refresh_token" : "password",
            refresh_token: refreshToken,
            username: username,
            password: password,
        });

        this._accessTokenLastUpdate = Date.now();
        this._accessToken = login.access_token;
        this._ttl = +login.expires_in;
        this._refreshToken = login.refresh_token;
    }
}
