import React from "react";
import { Layout } from "antd";
import UserSidebar from "../components/Sidebar/UserSidebar";
import { Outlet } from "react-router-dom";
import styles from "./AdminLayout.module.css";
import AppHeader from "../components/Header/Header";

const { Content } = Layout;

const UserLayout: React.FC = () => {
    return (
        <Layout className={styles.mainLayout}>
            <AppHeader />
            <Layout className={styles.bottomLayout}>
                <UserSidebar />
                <Layout className={styles.contentLayout}>
                    <Content className={styles.content}>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default UserLayout;
