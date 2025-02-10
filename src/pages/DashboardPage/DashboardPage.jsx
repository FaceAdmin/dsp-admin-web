import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Button, Dropdown, Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { logoutUser } from "../../api/auth";
import "./styles.css";

const { Header, Content } = Layout;
const { Text } = Typography;

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ fname: "", lname: "", role: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const profileMenu = [
    {
      key: "profile",
      label: "Your Profile",
      onClick: () => navigate("/profile"),
    },
    {
      key: "logout",
      label: "Logout",
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Layout className="dashboard-layout">
      <Header className="header">
        <Text className="dashboard-title">Dashboard</Text>

        <Dropdown menu={{ items: profileMenu }} trigger={["click"]}>
          <div className="profile-section">
            <Avatar icon={<UserOutlined />} size={40} />
            <div className="profile-info">
              <Text className="profile-name">{user.fname} {user.lname}</Text>
              <Text className="profile-role">{user.role}</Text>
            </div>
          </div>
        </Dropdown>
      </Header>

      <Content className="dashboard-content">
        <h2>Welcome to the Admin Dashboard</h2>
      </Content>
    </Layout>
  );
};

export default DashboardPage;
