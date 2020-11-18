import { Client } from "../client.js";
import axios from "axios";

export default class UserModule {
    private static endpoint: string = "/api/3/user";

    private constructor() {}

    static async get(client: Client): Promise<User> {
        return axios({
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${await client.token}`,
            },
            url: client.url + this.endpoint,
        }).then((response) => {
            return response.data;
        });
    }
}

interface User {
    UserUID: string;
    Class: Class;
    FullName: string;
    SchoolOrganizationName: string;
    SchoolType: any;
    UserType: string;
    UserTypeText: string;
    StudyYear: number;
    EnabledModules: Array<EnabledModule>;
    SettingModules: SettingModule;
}

interface Class {
    Id: string;
    Abbrev: string;
    Name: string;
}

interface EnabledModule {
    Module: string;
    Rights: Array<string>;
}

interface SettingModule {
    Common: Common;
}

interface Common {
    $type: string;
    ActualSemester: ActualSemester;
}

interface ActualSemester {
    SemesterId: string;
    From: string;
    To: string;
}
