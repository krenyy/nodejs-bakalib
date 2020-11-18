import Auth from "./auth.js";

/** Bakaláři Client representation */
export class Client {
    private auth: Auth;

    /** User access token */
    get token(): Promise<string> {
        return this.auth.token;
    }

    /** User URL */
    get url(): string {
        return this.auth._url;
    }

    constructor() {
        this.auth = new Auth();
    }

    async loginPassword(
        url: string,
        username: string,
        password: string
    ): Promise<void> {
        await this.auth.initialize(url, username, password, null);
    }

    async loginRefreshToken(url: string, refreshToken: string): Promise<void> {
        await this.auth.initialize(null, null, refreshToken);
    }
}
