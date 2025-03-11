const API_URL = "http://127.0.0.1:8000";

export interface EntryCode {
    code_id: number;
    user: number;
    user_fname: string;
    user_lname: string;
    user_email: string;
    user_role: string;
    code: string;
    created_at: string;
    updated_at: string;
}

export async function getEntryCodes(): Promise<EntryCode[]> {
    const response = await fetch(`${API_URL}/entry-codes/`);
    if (!response.ok) {
        throw new Error("Failed to fetch entry codes");
    }
    return response.json();
}

export async function getEntryCode(userId: number): Promise<EntryCode> {
    const response = await fetch(`${API_URL}/entry-codes/${userId}/`);
    if (!response.ok) throw new Error("Failed to fetch entry code");
    return response.json();
}

export async function updateEntryCode(userId: number, updates: Partial<EntryCode>): Promise<EntryCode> {
    const response = await fetch(`${API_URL}/entry-codes/${userId}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
    });
    if (!response.ok) {
        throw new Error("Failed to update entry code");
    }
    return response.json();
}
