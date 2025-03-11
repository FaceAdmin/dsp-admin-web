const API_URL = "http://127.0.0.1:8000";

export interface ReportParams {
    start_date: string;
    end_date: string;
    user_id?: number;
}

export function getReportUrl(params: ReportParams): string {
    const url = new URL(`${API_URL}/reports/csv/`);
    url.searchParams.append("start_date", params.start_date);
    url.searchParams.append("end_date", params.end_date);
    if (params.user_id) {
        url.searchParams.append("user_id", params.user_id.toString());
    }
    return url.toString();
}
