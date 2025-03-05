import React, { useEffect, useState } from "react";
import { Table, Button, DatePicker, App, Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import durationPlugin from "dayjs/plugin/duration";
import { getAttendanceRecords, deleteAttendance, Attendance } from "../../api/attendance";
import SearchBar from "../../components/Searchbar/SearchBar";
import styles from "./AttendancePage.module.css";
import {parseDuration} from "../../utils/parseInterval.ts";

dayjs.extend(durationPlugin);

const AttendancePage: React.FC = () => {
    const [records, setRecords] = useState<Attendance[]>([]);
    const [filteredRecords, setFilteredRecords] = useState<Attendance[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const { message, modal } = App.useApp();

    useEffect(() => {
        fetchRecords();
    }, [selectedDate]);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredRecords(records);
        } else {
            const lowerSearch = searchTerm.toLowerCase();
            const filtered = records.filter((record) =>
                [record.user.fname, record.user.lname, record.user.email].some(field =>
                    field.toLowerCase().includes(lowerSearch)
                )
            );
            setFilteredRecords(filtered);
        }
    }, [searchTerm, records]);

    const fetchRecords = async () => {
        setLoading(true);
        try {
            const data = await getAttendanceRecords(selectedDate ?? undefined);
            setRecords(data);
            setFilteredRecords(data);
        } catch (error) {
            console.error("Failed to fetch attendance records:", error);
            message.error("Failed to load attendance data");
        }
        setLoading(false);
    };

    const columns: ColumnsType<Attendance> = [
        {
            title: "First Name",
            dataIndex: ["user", "fname"],
            key: "fname",
        },
        {
            title: "Last Name",
            dataIndex: ["user", "lname"],
            key: "lname",
        },
        {
            title: "Email",
            dataIndex: ["user", "email"],
            key: "email",
        },
        {
            title: "Role",
            dataIndex: ["user", "role"],
            key: "role",
            width: 100,
        },
        {
            title: "Date",
            dataIndex: "check_in",
            key: "date",
            render: (value: string) => dayjs(value).format("DD/MM/YYYY"),
        },
        {
            title: "Check-in Time",
            dataIndex: "check_in",
            key: "check_in_time",
            render: (value: string) => dayjs(value).format("HH:mm"),
        },
        {
            title: "Check-out Time",
            dataIndex: "check_out",
            key: "check_out_time",
            render: (value: string | null) =>
                value ? dayjs(value).format("HH:mm") : <Tag color="green">Still in office</Tag>,
        },
        {
            title: "Total Duration",
            dataIndex: "duration",
            key: "duration",
            render: (value: string | null) => {
                if (!value) {
                    return <Tag color="gray">N/A</Tag>;
                }
                const parsed = parseDuration(value);
                return parsed;
            },
        },
        {
            title: "Actions",
            key: "actions",
            width: 100,
            render: (_, record) => (
                <Space>
                    <Button icon={<EditOutlined />} type="text" onClick={() => handleEdit()} />
                    <Button icon={<DeleteOutlined />} danger type="text" onClick={() => handleDelete(record)} />
                </Space>
            ),
        },
    ];

    const handleEdit = () => {
        message.info("Editing attendance is not implemented yet.");
    };

    const handleDelete = (record: Attendance) => {
        modal.confirm({
            title: "Are you sure you want to delete this record?",
            content: "This action cannot be undone",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk: async () => {
                try {
                    await deleteAttendance(record.attendance_id);
                    message.success("Attendance record deleted!");
                    fetchRecords();
                } catch (error) {
                    console.error(error);
                    message.error("Error deleting attendance record");
                }
            },
        });
    };

    return (
        <div className={styles.attendanceContainer}>
            <div className={styles.header}>
                <SearchBar
                    value={searchTerm}
                    onChange={(val) => setSearchTerm(val)}
                />
                <Space>
                    <DatePicker
                        onChange={(_date, dateString) => setSelectedDate(Array.isArray(dateString) ? dateString[0] : dateString || null)}
                        format="YYYY-MM-DD"
                        placeholder="Select Date"
                    />
                </Space>
            </div>

            <Table<Attendance>
                columns={columns}
                dataSource={filteredRecords}
                loading={loading}
                rowKey="attendance_id"
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default AttendancePage;
