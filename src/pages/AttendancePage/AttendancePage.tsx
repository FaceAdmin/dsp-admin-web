import React, {useContext, useEffect, useState} from "react";
import { Table, Button, DatePicker, App, Tag, Space, Modal, TimePicker, Form } from "antd";
import { EditOutlined, DeleteOutlined, RedoOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import durationPlugin from "dayjs/plugin/duration";
import { getAttendanceRecords, updateAttendance, deleteAttendance, Attendance } from "../../api/attendance";
import SearchBar from "../../components/Searchbar/SearchBar";
import styles from "./AttendancePage.module.css";
import { parseDuration } from "../../utils/parseDuration.ts";
import {AuthContext} from "../../context/AuthContext.tsx";

dayjs.extend(durationPlugin);

const AttendancePage: React.FC = () => {
    const [records, setRecords] = useState<Attendance[]>([]);
    const { user } = useContext(AuthContext);
    const [filteredRecords, setFilteredRecords] = useState<Attendance[]>([]);
    const [loading, setLoading] = useState(false);
    const today = dayjs().format("YYYY-MM-DD");
    const [selectedDate, setSelectedDate] = useState<string | null>(today);
    const [searchTerm, setSearchTerm] = useState("");

    const { message, modal } = App.useApp();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState<Attendance | null>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchRecords();
    }, [selectedDate]);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredRecords(records);
        } else {
            const lowerSearch = searchTerm.toLowerCase();
            const filtered = records.filter((record) =>
                [record.user.first_name, record.user.last_name, record.user.email].some(field =>
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

    const handleEdit = (record: Attendance) => {
        setEditingRecord(record);
        setIsModalOpen(true);
        form.setFieldsValue({
            check_in: record.check_in ? dayjs(record.check_in) : null,
            check_out: record.check_out ? dayjs(record.check_out) : null,
        });
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

    const handleSave = async (values: any) => {
        if (!editingRecord) return;

        try {
            await updateAttendance(editingRecord.attendance_id, {
                check_in: values.check_in ? values.check_in.toISOString() : null,
                check_out: values.check_out ? values.check_out.toISOString() : null,
            });

            message.success("Attendance record updated!");
            setIsModalOpen(false);
            fetchRecords();
        } catch (error) {
            console.error("Error updating attendance record:", error);
            message.error("Error updating attendance record");
        }
    };

    const baseColumns: ColumnsType<Attendance> = [
        { title: "First Name", dataIndex: ["user", "first_name"], key: "first_name" },
        { title: "Last Name", dataIndex: ["user", "last_name"], key: "last_name" },
        { title: "Email", dataIndex: ["user", "email"], key: "email" },
        { title: "Role", dataIndex: ["user", "role"], key: "role", width: 100 },
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
                if (!value) return <Tag color="gray">N/A</Tag>;
                return parseDuration(value);
            },
        },
    ];
    const columns: ColumnsType<Attendance> = user?.role === "Admin"
        ? [
            ...baseColumns,
            {
                title: "Actions",
                key: "actions",
                width: 100,
                render: (_: any, record: Attendance) => (
                    <Space>
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
                    </Space>
                ),
            },
        ]
        : baseColumns;

    return (
        <div className={styles.attendanceContainer}>
            <div className={styles.header}>
                <SearchBar value={searchTerm} onChange={(val) => setSearchTerm(val)} />
                <Space>
                    <DatePicker
                        value={ selectedDate ? dayjs(selectedDate) : undefined }
                        onChange={(date: Dayjs | null) =>
                            setSelectedDate(date ? date.format("YYYY-MM-DD") : null)
                        }
                        allowClear
                        format="YYYY-MM-DD"
                        placeholder="Select Date"
                        inputReadOnly
                    />
                    <Button
                        icon={<RedoOutlined />}
                        type="primary"
                        onClick={fetchRecords}
                    >
                        Refresh
                    </Button>
                </Space>
            </div>

            <Table<Attendance>
                columns={columns}
                dataSource={filteredRecords}
                loading={loading}
                rowKey="attendance_id"
                pagination={{ pageSize: 10 }}
            />
            <Modal
                title="Edit Attendance"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => form.submit()}
            >
                <Form form={form} layout="vertical" onFinish={handleSave}>
                    <Form.Item label="Check-in Time" name="check_in" rules={[{ required: true }]}>
                        <TimePicker format="HH:mm" style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item label="Check-out Time" name="check_out">
                        <TimePicker format="HH:mm" style={{ width: "100%" }} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AttendancePage;
