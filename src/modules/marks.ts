import { Client } from "../client.js";
import axios from "axios";

export default class MarksModule {
    private static endpoint: string = "/api/3/marks/";

    private constructor() {}

    static async get(client: Client): Promise<Marks> {
        return await this._get(client);
    }

    static async getFinal(client: Client): Promise<MarksFinal> {
        return await this._get(client, "final");
    }

    static async getMeasures(client: Client): Promise<MarksMeasures> {
        return await this._get(client, "measures");
    }

    static async getCountNew(client: Client): Promise<number> {
        return await this._get(client, "count-new");
    }

    static async _get(client: Client, type: string = "") {
        return axios({
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${await client.token}`,
            },
            url: client.url + MarksModule.endpoint + type,
        }).then((response) => {
            return response.data;
        });
    }
}

interface Marks {
    Subjects: Array<SubjectMarks>;
}

interface SubjectMarks {
    Marks: Array<Mark>;
    Subject: Subject;
    AverageText: string;
    TemporaryMark: string;
    SubjectNote: string;
    TemporaryMarkNote: string;
    PointsOnly: boolean;
    MarkPredictionEnabled: boolean;
}

interface Mark {
    MarkDate: string;
    EditDate: string;
    Caption: string;
    Theme: string;
    MarkText: string;
    TeacherId: string;
    Type: string;
    TypeNote: string;
    Weight: number;
    SubjectId: string;
    IsNew: boolean;
    IsPoints: boolean;
    CalculatedMarkText: string;
    ClassRankText: any;
    Id: string;
    PointsText: string;
    MaxPoints: number;
}

interface Subject {
    Id: string;
    Abbrev: string;
    Name: string;
}

interface MarksFinal {
    CertificateTerms: Array<CertificateTerm>;
}

interface CertificateTerm {
    FinalMarks: Array<FinalMark>;
    Subjects: Array<Subject>;
    GradeName: string;
    Grade: number;
    YearInSchool: number;
    SchoolYear: string;
    Semester: string;
    SemesterName: string;
    Repeated: boolean;
    Closed: boolean;
    AchievementText: string;
    MarksAverage: number;
    AbsentHours: number;
    NotExcusedHours: number;
    CertificateDate: string;
}

interface FinalMark {
    MarkDate: string;
    EditDate: string;
    MarkText: string;
    SubjectId: string;
    Id: string;
}

interface MarksMeasures {
    PedagogicalMeasures: Array<PedagogicalMeasure>;
}

interface PedagogicalMeasure {
    SchoolYear: string;
    Semester: string;
    TypeLabel: string;
    Date: string;
    TypeId: string;
    Text: string;
}
