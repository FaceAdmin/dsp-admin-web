import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";
import AppHeader from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./DashboardPage.module.css";

const { Content } = Layout;

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Layout className={styles.mainLayout}>
      <AppHeader />

      <Layout className={styles.bottomLayout}>
        <Sidebar />
        <Layout className={styles.contentLayout}>
          <Content className={styles.content}>
            <h2>Welcome to the Admin Dashboard</h2>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashboardPage;
