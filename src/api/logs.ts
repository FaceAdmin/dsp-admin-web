import {API_URL} from "../constants/constants.ts";

export interface Log {
    id: number;
    user: number | null;
    user_first_name?: string;
    user_last_name?: string;
    user_email?: string;
    action: string;
    timestamp: string;
}

export async function getLogs(): Promise<Log[]> {
    const response = await fetch(`${API_URL}/logs/`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch logs");
    }
    return response.json();
}
