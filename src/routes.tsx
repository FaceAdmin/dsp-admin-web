import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import AdminLayout from "./layouts/AdminLayout";
import AttendancePage from "./pages/AttendancePage/AttendancePage";

const routes = createRoutesFromElements(
  <>
    <Route path="/login" element={<LoginPage />} />
    <Route element={<AdminLayout />}>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="attendance" element={<AttendancePage />} />
    </Route>
  </>
);

export const router = createBrowserRouter(routes);
export default routes;
