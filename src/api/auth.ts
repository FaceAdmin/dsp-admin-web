const API_URL = "http://127.0.0.1:8000/users";

interface LoginResponse {
  token: string;
  user: {
    fname: string;
    lname: string;
    role: string;
    email: string;
  };
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data: LoginResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.user ? "Login failed" : "Invalid credentials");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const logoutUser = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
