import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import AppHeader from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import styles from "./AdminLayout.module.css";
import { checkAuth } from "../api/auth";

const { Content } = Layout;

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await checkAuth();
      } catch {
        navigate("/login");
      }
    };
    verifyUser();
  }, [navigate]);

  return (
      <Layout className={styles.mainLayout}>
        <AppHeader />
        <Layout className={styles.bottomLayout}>
          <Sidebar />
          <Layout className={styles.contentLayout}>
            <Content className={styles.content}>
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
  );
};

export default AdminLayout;
