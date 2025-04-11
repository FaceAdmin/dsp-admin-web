import React, { useEffect } from "react";
import {Modal, Form, Input, Select} from "antd";
import { User } from "../../api/users";

const { Option } = Select;

interface AddEditUserModalProps {
  open: boolean;
  isEditMode: boolean;
  user?: User | null;
  onSave: (values: any) => void;
  onCancel: () => void;
}

const AddEditUserModal: React.FC<AddEditUserModalProps> = ({
  open,
  isEditMode,
  user,
  onSave,
  onCancel,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isEditMode && user) {
      form.setFieldsValue({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      });
    } else {
      form.resetFields();
    }
  }, [isEditMode, user, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      onSave(values);
    });
  };

  return (
    <Modal
      title={isEditMode ? "Edit User" : "Add User"}
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="First Name" name="first_name" rules={[{ required: true }]}>
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item label="Last Name" name="last_name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item label="Role" name="role" rules={[{ required: true }]}>
          <Select placeholder="Select role">
            <Option value="Admin">Admin</Option>
            <Option value="User">User</Option>
          </Select>
        </Form.Item>

        {!isEditMode ? (
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password autoComplete="new-password" />
          </Form.Item>
        ) : (
          <>
            <Form.Item label="New Password" name="newPassword">
              <Input.Password autoComplete="new-password" />
            </Form.Item>
            <Form.Item
              label="Repeat New Password"
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password autoComplete="new-password" />
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default AddEditUserModal;
