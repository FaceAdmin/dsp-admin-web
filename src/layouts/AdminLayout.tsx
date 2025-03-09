import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import AppHeader from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import styles from "./AdminLayout.module.css";

const { Content } = Layout;

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const resp = await fetch("http://127.0.0.1:8000/users/me/", {
          credentials: "include",
        });
        if (!resp.ok) {
          navigate("/login");
        }
      } catch (err) {
        navigate("/login");
      }
    };
    checkAuth();
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
