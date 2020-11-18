import { Client } from "../client.js";
import axios from "axios";

export default class TimetableModule {
    private static _endpoint: string = "/api/3/timetable/";

    private constructor() {}

    static async getActual(client: Client, date: Date = null) {
        return await this._get(
            client,
            "actual",
            date
                ? `${date.getFullYear()}-${String(date.getMonth()).padStart(
                      2,
                      "0"
                  )}-${String(date.getDate()).padStart(2, "0")}`
                : null
        );
    }

    static async getPermanent(client: Client) {
        return await this._get(client, "permanent");
    }

    static async _get(
        client: Client,
        type: string,
        date?: string
    ): Promise<Timetable> {
        return axios({
            method: "GET",
            params: {
                date: date,
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${await client.token}`,
            },
            url: client.url + this._endpoint + type,
        }).then((response) => {
            return response.data;
        });
    }
}

interface Timetable {
    Hours: Array<Hour>;
    Days: Array<Day>;
    Classes: Array<Class>;
    Groups: Array<Group>;
    Subjects: Array<Subject>;
    Teachers: Array<Teacher>;
    Rooms: Array<Room>;
    Cycles: Array<Cycle>;
}

interface Hour {
    Id: number;
    Caption: string;
    BeginTime: string;
    EndTime: string;
}

interface Day {
    Atoms: Array<Atom>;
    DayOfWeek: number;
    Date: string;
    DayDescription: string;
    DayType: "WorkDay" | "Holiday" | "Celebration" | "Weekend";
}

interface Atom {
    HourId: number;
    GroupIds: Array<string>;
    SubjectId: string;
    TeacherId: string;
    RoomId: string;
    CycleIds: Array<string>;
    Change: Change;
    HomeworkIds: Array<string>;
    Theme: string;
}

interface Change {
    ChangeSubject: any;
    Day: string;
    Hours: string;
    ChangeType: "Canceled" | "Added" | "Removed" | "RoomChanged";
    Description: string;
    Time: string;
    TypeAbbrev: string;
    TypeName: string;
}

interface Entry {
    Id: string;
    Abbrev: string;
    Name: string;
}

interface Class extends Entry {}

interface Group extends Entry {
    ClassId: string;
}

interface Subject extends Entry {}

interface Teacher extends Entry {}

interface Room extends Entry {}

interface Cycle extends Entry {}
