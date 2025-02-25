import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
  FileSearchOutlined,
  BookOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import styles from "./Sidebar.module.css";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleMenuClick = (key: string) => {
    navigate(`/${key}`);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>FaceAdmin</div>

      <Menu
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        className={styles.menu}
        onClick={(info) => handleMenuClick(info.key)}
      >
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="users" icon={<UserOutlined />}>
          Users
        </Menu.Item>
        <Menu.Item key="attendance" icon={<FileSearchOutlined />}>
          Attendance
        </Menu.Item>
        <Menu.Item key="reports" icon={<FileTextOutlined />}>
          Reports
        </Menu.Item>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          Settings
        </Menu.Item>
        <Menu.Item key="logs" icon={<BookOutlined />}>
          Logs
        </Menu.Item>
        <Menu.Item key="docs" icon={<ClockCircleOutlined />}>
          Documentation
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
