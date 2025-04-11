import React, { useEffect, useState } from "react";
import { Layout, Dropdown, Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/auth";
import styles from "./Header.module.css";
import { getCurrentUser } from "../../api/users.ts";

const { Header } = Layout;
const { Text } = Typography;

interface User {
  first_name: string;
  last_name: string;
  role: string;
}

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const profileMenu = [
    { key: "profile", label: "Your Profile", onClick: () => navigate("/profile") },
    { key: "logout", label: "Logout", danger: true, onClick: () => { logoutUser(); } },
  ];

  return (
      <Header className={styles.header}>
        <Text className={styles.title}>FaceAdmin</Text>
        <Dropdown menu={{ items: profileMenu }} trigger={["click"]}>
          <div className={styles.profileSection}>
            <Avatar icon={<UserOutlined />} size={40} />
            {user && (
                <div className={styles.profileInfo}>
                  <Text className={styles.profileName}>{user.first_name} {user.last_name}</Text>
                  <Text className={styles.profileRole}>{user.role}</Text>
                </div>
            )}
          </div>
        </Dropdown>
      </Header>
  );
};

export default AppHeader;
