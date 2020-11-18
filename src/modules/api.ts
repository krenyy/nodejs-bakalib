import axios from "axios";

export default class APIModule {
    private static endpoint: string = "/api/";

    private constructor() {}

    static async get(url: string): Promise<Array<API>> {
        return axios({
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            url: url + this.endpoint,
        }).then((response) => {
            return response.data;
        });
    }
}

interface API {
    ApiVersion: string;
    ApplicationVersion: string;
    BaseUrl: string;
}
