import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import AdminLayout from "./layouts/AdminLayout";
import AttendancePage from "./pages/AttendancePage/AttendancePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage.tsx";
import ReportsPage from "./pages/ReportsPage/ReportsPage.tsx";
import FacesPage from "./pages/FacesPage/FacesPage.tsx";
import DocumentationPage from "./pages/DocumentationPage/DocumentationPage.tsx";
import LogsPage from "./pages/LogsPage/LogsPage.tsx";
import CodesPage from "./pages/CodesPage/CodesPage.tsx";

const routes = createRoutesFromElements(
  <>
    <Route path="/login" element={<LoginPage />} />
    <Route element={<AdminLayout />}>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/attendance" element={<AttendancePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/reports" element={<ReportsPage />} />
    <Route path="/codes" element={<CodesPage />} />
      <Route path="/faces" element={<FacesPage />} />
      <Route path="/docs" element={<DocumentationPage />} />
      <Route path="/logs" element={<LogsPage />} />
    </Route>
  </>
);

export const router = createBrowserRouter(routes);
export default routes;
