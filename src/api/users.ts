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

  // Создать нового пользователя
export async function createUser(newUser: Partial<User>): Promise<User> {
  const response = await fetch("http://127.0.0.1:8000/users/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  if (!response.ok) {
    throw new Error("Failed to create user");
  }
  return response.json();
}

// Обновить существующего пользователя
export async function updateUser(userId: number, updates: Partial<User>): Promise<User> {
  const response = await fetch(`http://127.0.0.1:8000/users/${userId}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error("Failed to update user");
  }
  return response.json();
}

  