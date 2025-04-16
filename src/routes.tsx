import React, { useContext, ReactNode } from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
    Outlet,
} from "react-router-dom";

import { AuthContext } from "./context/AuthContext";

import LoginPage         from "./pages/LoginPage/LoginPage";
import AttendancePage    from "./pages/AttendancePage/AttendancePage";
import ProfilePage       from "./pages/ProfilePage/ProfilePage";
import DashboardPage     from "./pages/DashboardPage/DashboardPage";
import UsersPage         from "./pages/UsersPage/UsersPage";
import ReportsPage       from "./pages/ReportsPage/ReportsPage";
import LogsPage          from "./pages/LogsPage/LogsPage";
import CodesPage         from "./pages/CodesPage/CodesPage";
import FacesPage         from "./pages/FacesPage/FacesPage";
import DocumentationPage from "./pages/DocumentationPage/DocumentationPage";

import AdminLayout from "./layouts/AdminLayout";
import UserLayout  from "./layouts/UserLayout";

type GuardProps = { children: ReactNode };

const RequireAuth: React.FC<GuardProps> = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading) return null;
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

const RequireAdmin: React.FC<GuardProps> = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    if (user.role !== "Admin") {
        return <Navigate to="/attendance" replace />;
    }
    return <>{children}</>;
};

const MainLayout: React.FC = () => {
    const { user } = useContext(AuthContext);
    return user?.role === "Admin" ? (
        <AdminLayout>
            <Outlet />
        </AdminLayout>
    ) : (
        <UserLayout>
            <Outlet />
        </UserLayout>
    );
};

const router = createBrowserRouter([
    { path: "/login", element: <LoginPage /> },
    {
        element: (
            <RequireAuth>
                <MainLayout />
            </RequireAuth>
        ),
        children: [
            { path: "/attendance", element: <AttendancePage /> },
            { path: "/profile",    element: <ProfilePage /> },
            {
                path: "/dashboard",
                element: (
                    <RequireAdmin>
                        <DashboardPage />
                    </RequireAdmin>
                ),
            },
            {
                path: "/users",
                element: (
                    <RequireAdmin>
                        <UsersPage />
                    </RequireAdmin>
                ),
            },
            {
                path: "/reports",
                element: (
                    <RequireAdmin>
                        <ReportsPage />
                    </RequireAdmin>
                ),
            },
            {
                path: "/logs",
                element: (
                    <RequireAdmin>
                        <LogsPage />
                    </RequireAdmin>
                ),
            },
            {
                path: "/codes",
                element: (
                    <RequireAdmin>
                        <CodesPage />
                    </RequireAdmin>
                ),
            },
            {
                path: "/faces",
                element: (
                    <RequireAdmin>
                        <FacesPage />
                    </RequireAdmin>
                ),
            },
            {
                path: "/docs",
                element: (
                    <RequireAdmin>
                        <DocumentationPage />
                    </RequireAdmin>
                ),
            },
            { path: "/", element: <Navigate to="/attendance" replace /> },
        ],
    },
    { path: "*", element: <Navigate to="/login" replace /> },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
