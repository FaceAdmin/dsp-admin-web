import React, { useState } from "react";
import { Layout, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth";
import styles from "./LoginPage.module.css";

const { Header, Content } = Layout;

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      await loginUser(values.email, values.password);
      message.success("Login successful!");
      navigate("/dashboard");
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.logo}>FaceAdmin</div>
      </Header>
      <Content className={styles.container}>
        <div className={styles.box}>
          <h2 className={styles.title}>Log In</h2>

          {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

          <Form name="login-form" layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { message: "Please enter your email" },
                { type: "email", message: "Invalid email format" },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ message: "Please enter your password" }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <div className={styles.forgotPassword}>
              <a href="#">Forgot Password?</a>
            </div>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default LoginPage;
