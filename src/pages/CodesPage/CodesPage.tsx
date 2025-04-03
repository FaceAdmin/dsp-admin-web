import React, { useEffect, useState } from "react";
import { Table, Button, App, Space } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import SearchBar from "../../components/Searchbar/SearchBar";
import styles from "./CodesPage.module.css";
import { getUsers, resendOtpEmail, User, regenerateOtpSecret } from "../../api/users";

const CodesPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const { message } = App.useApp();

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredUsers(users);
        } else {
            const lowerSearch = searchTerm.toLowerCase();
            const filtered = users.filter((user) =>
                [user.fname, user.lname, user.email, user.role].some((field) =>
                    field.toLowerCase().includes(lowerSearch)
                )
            );
            setFilteredUsers(filtered);
        }
    }, [searchTerm, users]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await getUsers();
            setUsers(data);
            setFilteredUsers(data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
            message.error("Failed to load users");
        }
        setLoading(false);
    };

    // Старая логика "Resend Email"
    const handleResendOtp = async (record: User) => {
        try {
            await resendOtpEmail(record.email);
            message.success("OTP email sent successfully!");
            fetchUsers();
        } catch (error) {
            console.error("Failed to resend OTP email:", error);
            message.error("Failed to resend OTP email");
        }
    };

    // Новая логика "Regenerate Secret"
    const handleRegenerateSecret = async (record: User) => {
        try {
            await regenerateOtpSecret(record.user_id);
            message.success("OTP secret regenerated and email sent!");
            fetchUsers();
        } catch (error) {
            console.error("Failed to regenerate OTP secret:", error);
            message.error("Failed to regenerate OTP secret");
        }
    };

    const columns: ColumnsType<User> = [
        { title: "First Name", dataIndex: "fname", key: "fname" },
        { title: "Last Name", dataIndex: "lname", key: "lname" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Role", dataIndex: "role", key: "role", width: 100 },
        {
            title: "OTP Added",
            dataIndex: "otp_configured",
            key: "otp_configured",
            render: (otp_configured: boolean) => (otp_configured ? "Yes" : "No")
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<ReloadOutlined />}
                        type="primary"
                        onClick={() => handleResendOtp(record)}
                        disabled={record.otp_configured}
                    >
                        Resend Email
                    </Button>
                    <Button
                        onClick={() => handleRegenerateSecret(record)}
                    >
                        Regenerate Secret
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className={styles.codesContainer}>
            <div className={styles.header}>
                <SearchBar value={searchTerm} onChange={(val) => setSearchTerm(val)} />
            </div>
            <Table<User>
                columns={columns}
                dataSource={filteredUsers}
                loading={loading}
                rowKey="user_id"
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default CodesPage;
