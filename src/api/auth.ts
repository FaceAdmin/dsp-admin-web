const API_URL = "http://127.0.0.1:8000";

interface LoginResponse {
  user: {
    first_name: string;
    last_name: string;
    role: string;
    email: string;
  };
}

export const checkAuth = async (): Promise<void> => {
  const response = await fetch(`${API_URL}/auth/`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unauthorized");
  }
};

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data: LoginResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.user ? "Login failed" : "Invalid credentials");
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await fetch(`${API_URL}/auth/logout/`, {
      method: "DELETE",
      credentials: "include",
    });
    window.location.href = "/login";
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
