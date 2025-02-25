import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { User } from "../../api/users";

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
        fname: user.fname,
        lname: user.lname,
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
        <Form.Item label="First Name" name="fname" rules={[{ required: true }]}>
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item label="Last Name" name="lname" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item label="Role" name="role" rules={[{ required: true }]}>
          <Input autoComplete="off" />
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
