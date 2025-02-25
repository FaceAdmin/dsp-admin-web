import React, { useEffect, useState } from "react";
import { Table, Button, App } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { getUsers, createUser, updateUser, User } from "../../api/users";
import AddEditUserModal from "./AddEditUserModal";
import SearchBar from "../../components/Searchbar/SearchBar";
import styles from "./UsersPage.module.css";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { message } = App.useApp();

  useEffect(() => {
    fetchUsers();
  }, []);

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
      render: (_, record) => (
        <Button type="link" onClick={() => handleEdit(record)}>
          Edit
        </Button>
      ),
      width: 80,
    },
  ];

  const handleEdit = (user: User) => {
    setIsEditMode(true);
    setEditUser(user);
    setIsModalOpen(true);
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

  const handleSearch = () => {
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
  };

  return (
    <div className={styles.usersContainer}>
      <div className={styles.header}>
        <SearchBar
          value={searchTerm}
          onChange={(val) => setSearchTerm(val)}
          onSearch={handleSearch}
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
