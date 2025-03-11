import React, { useEffect, useState } from "react";
import { Table, Button, App, Space } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { getEntryCodes, updateEntryCode, EntryCode } from "../../api/entryCodes";
import SearchBar from "../../components/Searchbar/SearchBar";
import styles from "./EntryCodesPage.module.css";

const EntryCodesPage: React.FC = () => {
    const [entryCodes, setEntryCodes] = useState<EntryCode[]>([]);
    const [filteredCodes, setFilteredCodes] = useState<EntryCode[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const { message } = App.useApp();

    useEffect(() => {
        fetchCodes();
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredCodes(entryCodes);
        } else {
            const lowerSearch = searchTerm.toLowerCase();
            const filtered = entryCodes.filter((code) =>
                [code.user_fname, code.user_lname, code.user_email, code.user_role].some(field =>
                    field.toLowerCase().includes(lowerSearch)
                )
            );
            setFilteredCodes(filtered);
        }
    }, [searchTerm, entryCodes]);

    const fetchCodes = async () => {
        setLoading(true);
        try {
            const data = await getEntryCodes();
            setEntryCodes(data);
            setFilteredCodes(data);
        } catch (error) {
            console.error("Failed to fetch entry codes:", error);
            message.error("Failed to load entry codes");
        }
        setLoading(false);
    };

    const handleRegenerate = async (record: EntryCode) => {
        const newCode = Math.floor(10000000 + Math.random() * 90000000).toString();
        try {
            await updateEntryCode(record.user, { code: newCode });
            message.success("Entry code regenerated!");
            fetchCodes();
        } catch (error) {
            console.error("Error regenerating entry code:", error);
            message.error("Failed to regenerate entry code");
        }
    };

    const columns: ColumnsType<EntryCode> = [
        { title: "First Name", dataIndex: "user_fname", key: "fname" },
        { title: "Last Name", dataIndex: "user_lname", key: "lname" },
        { title: "Email", dataIndex: "user_email", key: "email" },
        { title: "Role", dataIndex: "user_role", key: "role", width: 100 },
        { title: "Entry Code", dataIndex: "code", key: "code" },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button icon={<ReloadOutlined />} type="primary" onClick={() => handleRegenerate(record)}>
                        Regenerate
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className={styles.entryCodesContainer}>
            <div className={styles.header}>
                <SearchBar value={searchTerm} onChange={(val) => setSearchTerm(val)} />
            </div>
            <Table<EntryCode>
                columns={columns}
                dataSource={filteredCodes}
                loading={loading}
                rowKey="code_id"
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default EntryCodesPage;
