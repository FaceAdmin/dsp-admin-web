import React, { useEffect, useState } from "react";
import { App, Button, DatePicker, Typography, Dropdown, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { getUsers, User } from "../../api/users";
import styles from "./ReportsPage.module.css";
import { getReportUrl, ReportParams } from "../../api/reports.ts";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const ReportsPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [pickerOpen, setPickerOpen] = useState(false);

    const { message } = App.useApp();

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredUsers([]);
        } else {
            const lowerSearch = searchTerm.toLowerCase();
            const filtered = users.filter((user) =>
                `${user.fname} ${user.lname} ${user.email}`
                    .toLowerCase()
                    .includes(lowerSearch)
            );
            setFilteredUsers(filtered);
        }
    }, [searchTerm, users]);

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
            message.error("Failed to fetch users");
        }
    };

    const handleSelectUser = (user: User) => {
        setSelectedUser(user);
        setSearchTerm(`${user.fname} ${user.lname} (${user.email})`);
    };

    const handleGenerateReport = () => {
        if (!dateRange) {
            message.error("Please select a time range");
            return;
        }
        const startDate = dateRange[0].format("YYYY-MM-DD");
        const endDate = dateRange[1].format("YYYY-MM-DD");

        const params: ReportParams = { start_date: startDate, end_date: endDate };
        if (selectedUser) {
            params.user_id = selectedUser.user_id;
        }
        window.location.href = getReportUrl(params);
    };

    useEffect(() => {
        if (pickerOpen) {
            document.body.style.overflow = "hidden";
        }
    }, [pickerOpen]);

    return (
        <div className={styles.reportsContainer}>
            <Title level={3} style={{ marginBottom: 8 }}>
                Generate Report
            </Title>
            <Text style={{ marginBottom: 16, display: "block" }}>
                Choose user and the time range and then download the report in the CSV format.
            </Text>
            <div className={styles.filtersRow}>
                <Dropdown
                    open={!!searchTerm}
                    dropdownRender={() => (
                        <div className={styles.dropdownMenu}>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <div
                                        key={user.user_id}
                                        className={styles.dropdownItem}
                                        onClick={() => handleSelectUser(user)}
                                    >
                                        {user.fname} {user.lname} ({user.email})
                                    </div>
                                ))
                            ) : (
                                <div className={styles.dropdownItem}>No users found</div>
                            )}
                        </div>
                    )}
                >
                    <Input
                        placeholder="Search user"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        allowClear
                        style={{ width: 300 }}
                        prefix={<SearchOutlined />}
                    />
                </Dropdown>

                <RangePicker
                    onChange={(dates) => setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])}
                    inputReadOnly={true}
                    autoComplete="off"
                    format="DD MMMM YYYY"
                    style={{ width: 520 }}
                    open={pickerOpen}
                    onOpenChange={(open) => setPickerOpen(open)}
                />
            </div>
            <div className={styles.buttonRow}>
                <Button type="primary" onClick={handleGenerateReport}>
                    Generate Report
                </Button>
            </div>
        </div>
    );
};

export default ReportsPage;
