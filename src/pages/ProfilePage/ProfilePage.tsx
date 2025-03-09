import React, { useEffect, useState } from "react";
import { Card, Tabs, Form, Input, Button, Typography, message } from "antd";
import type { TabsProps } from "antd";
import dayjs from "dayjs";
import { getCurrentUser, updateUser, User } from "../../api/users";
import styles from "./ProfilePage.module.css";

const { Title, Text } = Typography;

const ProfilePage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        setLoading(true);
        try {
            const data = await getCurrentUser();
            setUser(data);
            form.setFieldsValue({
                fname: data.fname,
                lname: data.lname,
                email: data.email,
            });
        } catch (error) {
            console.error("Failed to fetch user profile:", error);
            message.error("Failed to load profile data");
        }
        setLoading(false);
    };

    const handleSaveChanges = async (values: any) => {
        if (!user) return;
        try {
            await updateUser(user.user_id, {
                fname: values.fname,
                lname: values.lname,
                email: values.email,
            });
            message.success("Profile updated successfully!");
            fetchUserProfile();
        } catch (error) {
            console.error("Error updating user:", error);
            message.error("Error updating profile");
        }
    };

    const items: TabsProps["items"] = [
        {
            key: "details",
            label: "Details",
            children: (
                <div className={styles.tabContent}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSaveChanges}
                    >
                        <Form.Item
                            label="First Name"
                            name="fname"
                            rules={[{ required: true, message: "Please enter your first name" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Last Name"
                            name="lname"
                            rules={[{ required: true, message: "Please enter your last name" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Save changes
                        </Button>
                    </Form>
                </div>
            ),
        },
        {
            key: "photos",
            label: "Photos",
            children: <div className={styles.tabContent}>Photos content (coming soon)...</div>,
        },
        {
            key: "entryCode",
            label: "Entry Code",
            children: <div className={styles.tabContent}>Entry code content (coming soon)...</div>,
        },
        {
            key: "help",
            label: "Help",
            children: <div className={styles.tabContent}>Help content (coming soon)...</div>,
        },
    ];

    if (!user) {
        return <div className={styles.loading}>Loading user profile...</div>;
    }

    return (
        <div className={styles.profileContainer}>
            <Card className={styles.profileCard}>
                <Title level={4}>
                    {user.fname} {user.lname}
                </Title>
                <Text>Email: {user.email}</Text>
                <br />
                <Text>Role: {user.role}</Text>
                <br />
                <Text>
                    Created: {dayjs(user.created_at).format("DD/MM/YYYY HH:mm")}
                </Text>
                <br />
                <Text>
                    Edited: {dayjs(user.updated_at).format("DD/MM/YYYY HH:mm")}
                </Text>
            </Card>

            <Tabs defaultActiveKey="details" items={items} />
        </div>
    );
};

export default ProfilePage;
