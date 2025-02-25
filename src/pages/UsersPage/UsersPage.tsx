import React, { useEffect, useState } from "react";
import { Table, Input, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getUsers, User } from "../../api/users";
import styles from "./UsersPage.module.css";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
    setLoading(false);
  };

  const columns: ColumnsType<User> = [
    { title: "First Name", dataIndex: "fname", key: "fname" },
    { title: "Last Name", dataIndex: "lname", key: "lname" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role", width: 100 },
    { title: "Password", dataIndex: "password", key: "password" },
    { title: "Created", dataIndex: "created_at", key: "created_at" },
    { title: "Edited", dataIndex: "updated_at", key: "updated_at" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="link" onClick={() => handleEdit(record.user_id)}>
          Edit
        </Button>
      ),
      width: 80,
    },
  ];

  const handleEdit = (userId: number) => {
    navigate(`/users/${userId}/edit`);
  };

  const handleSearch = () => {
    if (!searchTerm) {
      fetchUsers();
    } else {
      const filtered = users.filter((u) =>
        [u.fname, u.lname, u.email].some((field) =>
          field.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setUsers(filtered);
    }
  };

  const handleAddUser = () => {
    navigate("/users/add");
  };

  return (
    <div className={styles.usersContainer}>
      <div className={styles.header}>
        <Input
          placeholder="Search user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
          style={{ width: 200 }}
        />
        <Button icon={<SearchOutlined />} onClick={handleSearch}>
          Search
        </Button>
        <Button type="primary" onClick={handleAddUser}>
          Add User
        </Button>
      </div>

      <Table<User>
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="user_id"
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
};

export default UsersPage;
