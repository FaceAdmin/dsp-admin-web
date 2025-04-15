import React, { useEffect, useState } from "react";
import { Card, Tabs, Form, Input, Button, Typography, message } from "antd";
import type { TabsProps } from "antd";
import dayjs from "dayjs";
import { getCurrentUser, updateUser, User } from "../../api/users";
import styles from "./ProfilePage.module.css";
import ProfilePhotosTab from "./ProfilePhotosTab.tsx";

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
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            form.setFieldsValue({
                first_name: currentUser.first_name,
                last_name: currentUser.last_name,
                email: currentUser.email,
            });
        } catch (error) {
            console.error("Failed to fetch user profile or entry code:", error);
            message.error("Failed to load profile data");
        }
        setLoading(false);
    };

    const handleSaveChanges = async (values: any) => {
        if (!user) return;
        try {
            await updateUser(user.user_id, {
                first_name: values.first_name,
                last_name: values.last_name,
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
                    <Form form={form} layout="vertical" onFinish={handleSaveChanges}>
                        <Form.Item
                            label="First Name"
                            name="first_name"
                            rules={[{ required: true, message: "Please enter your first name" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Last Name"
                            name="last_name"
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
            children: (
                <div className={styles.tabContent}>
                    {user && <ProfilePhotosTab user={user} />}
                </div>
            ),
        },
        {
            key: "help",
            label: "Help",
            children: (
                <div className={styles.tabContent}>
                    <h2>Photo Guidelines for Face Recognition</h2>
                    <p>
                        To ensure accurate and reliable face recognition, please upload clear, high-quality
                        photos of yourself where your face is fully visible. We recommend uploading a set of
                        5-7 photos taken from various angles, including a straight-on view as well as profile
                        (side) views. These photos help the system to build a comprehensive facial encoding.
                    </p>
                    <p>
                        For best results, please consider the following guidelines:
                    </p>
                    <ul>
                        <li>
                            <strong>Good lighting:</strong> Make sure your face is well illuminated with minimal shadows.
                        </li>
                        <li>
                            <strong>Visibility:</strong> Avoid using accessories like hats, sunglasses, or masks that
                            might obscure your facial features.
                        </li>
                        <li>
                            <strong>Variety:</strong> Capture your face from multiple angles (front, left, right, and
                            additional angles) to allow the system to learn your unique features effectively.
                        </li>
                        <li>
                            <strong>Focus:</strong> Ensure that your face is in sharp focus and not blurry.
                        </li>
                    </ul>
                    <p>
                        Once your photos are uploaded in the Photos tab, our system will compute your facial
                        encodings. From that moment, you can simply present your face to gain access.
                    </p>
                    <p>
                        Thank you for helping us build a secure and user-friendly system!
                    </p>
                </div>
            ),
        },
    ];

    if (!user) {
        return <div className={styles.loading}>Loading user profile...</div>;
    }

    return (
        <div className={styles.profileContainer}>
            <Card className={styles.profileCard}>
                <Title level={4}>
                    {user.first_name} {user.last_name}
                </Title>
                <Text>Email: {user.email}</Text>
                <br />
                <Text>Role: {user.role}</Text>
                <br />
                <Text>Created: {dayjs(user.created_at).format("DD/MM/YYYY HH:mm")}</Text>
                <br />
                <Text>Edited: {dayjs(user.updated_at).format("DD/MM/YYYY HH:mm")}</Text>
            </Card>

            <Tabs defaultActiveKey="details" items={items} />
        </div>
    );
};

export default ProfilePage;
