import React from "react";
import { Layout, Dropdown, Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/auth";
import styles from "./Header.module.css";

const { Header } = Layout;
const { Text } = Typography;

interface User {
  fname: string;
  lname: string;
  role: string;
}

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");

  const profileMenu = [
    { key: "profile", label: "Your Profile", onClick: () => navigate("/profile") },
    { key: "logout", label: "Logout", danger: true, onClick: () => { logoutUser(); navigate("/login"); } },
  ];

  return (
    <Header className={styles.header}>
      <Text className={styles.title}>FaceAdmin</Text>
      <Dropdown menu={{ items: profileMenu }} trigger={["click"]}>
        <div className={styles.profileSection}>
          <Avatar icon={<UserOutlined />} size={40} />
          <div className={styles.profileInfo}>
            <Text className={styles.profileName}>{user.fname} {user.lname}</Text>
            <Text className={styles.profileRole}>{user.role}</Text>
          </div>
        </div>
      </Dropdown>
    </Header>
  );
};

export default AppHeader;
