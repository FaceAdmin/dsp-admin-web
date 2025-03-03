import React, { useEffect, useState } from "react";
import { Table, Button, App } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { getUsers, createUser, updateUser, deleteUser, User } from "../../api/users";
import AddEditUserModal from "./AddEditUserModal";
import styles from "./UsersPage.module.css";
import SearchBar from "../../components/Searchbar/SearchBar.tsx";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { message, modal } = App.useApp();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((u) =>
          [u.fname, u.lname, u.email].some((field) =>
              field.toLowerCase().includes(searchTerm.toLowerCase())
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
      message.error("Failed to fetch users");
    }
    setLoading(false);
  };

  const columns: ColumnsType<User> = [
    { title: "First Name", dataIndex: "fname", key: "fname" },
    { title: "Last Name", dataIndex: "lname", key: "lname" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role", width: 100 },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
      render: () => "*****",
    },
    {
      title: "Created",
      dataIndex: "created_at",
      key: "created_at",
      render: (value: string) => dayjs(value).format("DD/MM/YYYY | HH:mm"),
    },
    {
      title: "Edited",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (value: string) => dayjs(value).format("DD/MM/YYYY | HH:mm"),
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_, record) => (
          <div style={{ display: "flex", gap: "8px" }}>
            <Button
                icon={<EditOutlined />}
                type="text"
                onClick={() => handleEdit(record)}
            />
            <Button
                icon={<DeleteOutlined />}
                danger
                type="text"
                onClick={() => handleDelete(record)}
            />
          </div>
      ),
    },
  ];

  const handleEdit = (user: User) => {
    setIsEditMode(true);
    setEditUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (user: User) => {
    modal.confirm({
      title: "Are you sure you want to delete this user?",
      content: "This action cannot be undone",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await deleteUser(user.user_id);
          message.success("User deleted!");
          fetchUsers();
        } catch (error) {
          console.error(error);
          message.error("Error deleting user");
        }
      },
    });
  };

  const handleAddUser = () => {
    setIsEditMode(false);
    setEditUser(null);
    setIsModalOpen(true);
  };

  const handleSaveUser = async (values: any) => {
    try {
      if (isEditMode && editUser) {
        await updateUser(editUser.user_id, values);
        message.success("User updated!");
      } else {
        await createUser(values);
        message.success("User created!");
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error(error);
      message.error("Error saving user");
    }
  };

  return (
      <div className={styles.usersContainer}>
        <div className={styles.header}>
          <SearchBar
              value={searchTerm}
              onChange={(val) => setSearchTerm(val)}
          />
          <Button type="primary" onClick={handleAddUser}>
            Add User
          </Button>
        </div>

        <Table<User>
            columns={columns}
            dataSource={filteredUsers}
            loading={loading}
            rowKey="user_id"
            pagination={{ pageSize: 8 }}
        />

        <AddEditUserModal
            open={isModalOpen}
            isEditMode={isEditMode}
            user={editUser}
            onSave={handleSaveUser}
            onCancel={() => setIsModalOpen(false)}
        />
      </div>
  );
};

export default UsersPage;
