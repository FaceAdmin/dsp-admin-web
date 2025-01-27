import React, { useState } from 'react';
import { Layout, Form, Input, Button } from 'antd';

const { Header, Content } = Layout;

function App() {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    console.log('Login form values:', values);
    setLoading(true);
    // logic to the API
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: '#1890ff', display: 'flex', alignItems: 'center' }}>
        <div style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold' }}>
          FaceAdmin
        </div>
      </Header>
      <Content
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        background: '#f0f2f5',
        height: '100vh'
      }}
      >
        <div style={{
          maxWidth: '400px',
          width: '100%',
          background: '#fff',
          marginBottom: 96,
          padding: '32px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}>

          <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Log In</h2>
          
          <Form
            name="login-form"
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Incorrect email!' },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please enter password' }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            
            <div style={{ textAlign: 'right', marginBottom: 16 }}>
              <a href="#">Forgot Password?</a>
            </div>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                block
                loading={loading}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
}

export default App;
