import {API_URL} from "../constants/constants.ts";

export interface HourData {
    hour: number;
    count: number;
}

export interface TimeStatsData {
    day: string;
    arrival: number | null;
    departure: number | null;
}

export interface LeaderboardItem {
    name: string;
    hours: number;
}

export interface DashboardData {
    chart_hours: HourData[];
    chart_time_stats: TimeStatsData[];
    chart_leaderboard: LeaderboardItem[];
}

export async function fetchDashboardData(): Promise<DashboardData> {
    const resp = await fetch(`${API_URL}/dashboard/data/`);
    if (!resp.ok) {
        throw new Error(`Failed to fetch dashboard data: ${resp.status}`);
    }
    return resp.json();
}
