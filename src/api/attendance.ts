export interface Attendance {
    attendance_id: number;
    user: {
        user_id: number;
        fname: string;
        lname: string;
        email: string;
        role: string;
    };
    check_in: string;
    check_out: string | null;
    duration: string | null;
}

const API_URL = "http://127.0.0.1:8000/attendance/";

export async function getAttendanceRecords(date?: string): Promise<Attendance[]> {
    const url = date ? `${API_URL}?date=${date}` : API_URL;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch attendance records");
    }
    return response.json();
}

export async function updateAttendance(id: number, updates: Partial<Attendance>): Promise<Attendance> {
    const response = await fetch(`${API_URL}${id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
    });
    if (!response.ok) {
        throw new Error("Failed to update attendance record");
    }
    return response.json();
}

export async function deleteAttendance(id: number): Promise<void> {
    const response = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete attendance record");
    }
}
