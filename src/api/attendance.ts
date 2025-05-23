import {API_URL} from "../constants/constants.ts";

export interface Attendance {
    attendance_id: number;
    user: {
        user_id: number;
        first_name: string;
        last_name: string;
        email: string;
        role: string;
    };
    check_in: string;
    check_out: string | null;
    duration: string | null;
}

export async function getAttendanceRecords(date?: string): Promise<Attendance[]> {
    const url = date
        ? `${API_URL}/attendance/?date=${date}`
        : `${API_URL}/attendance/`;
    const response = await fetch(url, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch attendance records");
    }
    return response.json();
}

export async function updateAttendance(id: number, updates: Partial<Attendance>): Promise<Attendance> {
    const response = await fetch(`${API_URL}/attendance/${id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to update attendance record");
    }
    return response.json();
}

export async function deleteAttendance(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/attendance/${id}/`, {
        method: "DELETE",
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to delete attendance record");
    }
}
