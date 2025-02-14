import React from "react";
import { Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
  FileSearchOutlined,
  BookOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import styles from "./Sidebar.module.css";

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.menuWrapper}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          className={styles.menu}
        >
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Users
          </Menu.Item>
          <Menu.Item key="3" icon={<FileSearchOutlined />}>
            Attendance
          </Menu.Item>
          <Menu.Item key="4" icon={<FileTextOutlined />}>
            Reports
          </Menu.Item>
          <Menu.Item key="5" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
          <Menu.Item key="6" icon={<BookOutlined />}>
            Logs
          </Menu.Item>
          <Menu.Item key="7" icon={<ClockCircleOutlined />}>
            Documentation
          </Menu.Item>
          <Menu.Item key="8" icon={<InfoCircleOutlined />}>
            About us
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default Sidebar;
