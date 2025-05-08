import {API_URL} from "../constants/constants.ts";

export interface ReportParams {
    start_date: string;
    end_date: string;
    user_id?: number;
}

export function getReportUrl(params: ReportParams): string {
    let url = `${API_URL}/reports/csv/?start_date=${params.start_date}&end_date=${params.end_date}`;
    if (params.user_id) {
        url += `&user_id=${params.user_id.toString()}`
    }
    return url;
}