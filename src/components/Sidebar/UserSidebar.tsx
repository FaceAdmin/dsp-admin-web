import React from "react";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { FileSearchOutlined } from "@ant-design/icons";
import styles from "./Sidebar.module.css";

const UserSidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentRoute = location.pathname.split("/")[1] || "attendance";

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
                <Menu.Item key="attendance" icon={<FileSearchOutlined />}>
                    Attendance
                </Menu.Item>
            </Menu>
        </div>
    );
};

export default UserSidebar;
