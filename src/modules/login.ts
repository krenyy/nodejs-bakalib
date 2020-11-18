import axios from "axios";
import * as qs from "qs";

export default class LoginModule {
    private static endpoint: string = "/api/login";

    private constructor() {}

    static async get(url: string, body: RequestBody): Promise<Login> {
        return axios({
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: qs.stringify(body),
            url: url + this.endpoint,
        }).then((response) => {
            return response.data;
        });
    }
}

interface RequestBody {
    client_id: string;
    grant_type: string;
    refresh_token: string;
    username: string;
    password: string;
}

interface Login {
    "bak:ApiVersion": string;
    "bak:AppVersion": string;
    "bak:UserId": string;
    access_token: string;
    refresh_token: string;
    id_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
}
