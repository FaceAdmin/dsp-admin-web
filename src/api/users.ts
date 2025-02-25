export interface User {
    user_id: number;
    fname: string;
    lname: string;
    email: string;
    role: string;
    password: string;
    created_at: string;
    updated_at: string;
  }
  
  export async function getUsers(): Promise<User[]> {
    const response = await fetch("http://127.0.0.1:8000/users/");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return response.json();
  }
  