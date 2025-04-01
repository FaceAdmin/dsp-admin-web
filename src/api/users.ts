const API_URL = "http://127.0.0.1:8000";

export interface User {
    user_id: number;
    fname: string;
    lname: string;
    email: string;
    role: string;
    password: string;
    otp_configured: boolean;
    created_at: string;
    updated_at: string;
  }
  
export async function getUsers(): Promise<User[]> {
const response = await fetch(`${API_URL}/users/`);
if (!response.ok) {
  throw new Error("Failed to fetch users");
}
return response.json();
}

export async function getCurrentUser(): Promise<User> {
    const response = await fetch(`${API_URL}/users/me/`, {
        method: "GET",
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch current user");
    }
    return response.json();
}

export async function createUser(newUser: Partial<User>): Promise<User> {
  const response = await fetch(`${API_URL}/users/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  if (!response.ok) {
    throw new Error("Failed to create user");
  }
  return response.json();
}

export async function updateUser(userId: number, updates: Partial<User>): Promise<User> {
  const response = await fetch(`${API_URL}/users/${userId}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error("Failed to update user");
  }
  return response.json();
}

export async function deleteUser(userId: number): Promise<void> {
    const response = await fetch(`${API_URL}/users/${userId}/`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete user");
    }
}

export async function resendOtpEmail(email: string): Promise<{message: string}> {
    const response = await fetch(`${API_URL}/users/resend-otp/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    });
    if (!response.ok) {
        throw new Error("Failed to resend OTP email");
    }
    return response.json();
}
  