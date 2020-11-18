import axios from "axios";

export class Municipality {
    private static url: string =
        "http://sluzby.bakalari.cz/api/v1/municipality/";

    static async getCities(): Promise<Array<City>> {
        return axios({
            method: "GET",
            url: this.url,
        }).then((response) => {
            // To filter out the one entry which has an empty 'city' attribute
            return response.data.filter((city: City) => {
                return city.name;
            });
        });
    }

    static async getSchools(cityName: string): Promise<Array<School>> {
        return axios({
            method: "GET",
            url: this.url + cityName,
        }).then((response) => {
            return response.data.schools;
        });
    }
}

interface City {
    name: string;
    schoolCount: number;
}

interface School {
    id: string;
    name: string;
    schoolUrl: string;
}
