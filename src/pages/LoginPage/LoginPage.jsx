import React, { useState } from 'react';
import { Layout, Form, Input, Button, message } from 'antd';
import { loginUser } from "../../api/auth";
import { useNavigate } from 'react-router-dom';
import './styles.css';

const { Header, Content } = Layout;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log('Login form values:', values);
    setLoading(true);

    try {
      const data = await loginUser(values.email, values.password);
      message.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      message.error(error.message);
    }
    setLoading(false);
  };


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <div className="logo">FaceAdmin</div>
      </Header>
      <Content className="login-container">
        <div className="login-box">
          <h2>Log In</h2>
          <Form name="login-form" layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Invalid email format' },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <div className="forgot-password">
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
