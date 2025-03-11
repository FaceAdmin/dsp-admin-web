import React from "react";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BarChartOutlined,
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
  FileSearchOutlined,
  AlignLeftOutlined,
  ClockCircleOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import styles from "./Sidebar.module.css";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentRoute = location.pathname.split("/")[1] || "dashboard";
  const handleMenuClick = (key: string) => {
    navigate(`/${key}`);
  };

  return (
    <div className={styles.sidebar}>
      <Menu
        mode="inline"
        selectedKeys={[currentRoute]}
        className={styles.menu}
        onClick={(info) => handleMenuClick(info.key)}
      >
        <Menu.Item key="dashboard" icon={<BarChartOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="users" icon={<UserOutlined />}>
          Users
        </Menu.Item>
        <Menu.Item key="attendance" icon={<FileSearchOutlined />}>
          Attendance
        </Menu.Item>
        <Menu.Item key="entrycodes" icon={<QrcodeOutlined />}>
          Entry Codes
        </Menu.Item>
        <Menu.Item key="reports" icon={<FileTextOutlined />}>
          Reports
        </Menu.Item>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          Settings
        </Menu.Item>
        <Menu.Item key="logs" icon={<ClockCircleOutlined />}>
          Logs
        </Menu.Item>
        <Menu.Item key="docs" icon={<AlignLeftOutlined />}>
          Documentation
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
