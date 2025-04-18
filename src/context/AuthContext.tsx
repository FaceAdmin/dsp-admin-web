import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getCurrentUser, User } from "../api/users";

interface AuthContextValue {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextValue>({
    user: null,
    setUser: () => {},
    loading: true,
});

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
            .then((u) => setUser(u))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
