import React, { useEffect, useState, useRef } from "react";
import { Table, Button, App, Space, Modal, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import SearchBar from "../../components/Searchbar/SearchBar";
import styles from "./FacePage.module.css";
import { getUsers, User } from "../../api/users";
import { getPhotos, Photo, deletePhoto, uploadPhoto } from "../../api/photos";

export interface UserWithPhoto extends User {
    hasPhoto: boolean;
}

const FacesPage: React.FC = () => {
    const [users, setUsers] = useState<UserWithPhoto[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserWithPhoto[]>([]);
    const [allPhotos, setAllPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterValue, setFilterValue] = useState<string>("all");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserWithPhoto | null>(null);
    const [selectedUserPhotos, setSelectedUserPhotos] = useState<Photo[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const { message: antMessage } = App.useApp();

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [searchTerm, filterValue, users]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [usersData, photosData] = await Promise.all([getUsers(), getPhotos()]);

            const photoCountMap = new Map<number, number>();
            photosData.forEach((p) => {
                const count = photoCountMap.get(p.user) || 0;
                photoCountMap.set(p.user, count + 1);
            });

            const usersWithPhoto: UserWithPhoto[] = usersData.map((u) => ({
                ...u,
                hasPhoto: (photoCountMap.get(u.user_id) || 0) > 0,
            }));

            setUsers(usersWithPhoto);
            setFilteredUsers(usersWithPhoto);
            setAllPhotos(photosData);
        } catch (error) {
            console.error("Failed to fetch data:", error);
            antMessage.error("Failed to load user data");
        }
        setLoading(false);
    };

    const applyFilters = () => {
        let temp = [...users];

        if (searchTerm.trim() !== "") {
            const lowerSearch = searchTerm.toLowerCase();
            temp = temp.filter((user) =>
                [user.fname, user.lname, user.email, user.role].some((field) =>
                    field.toLowerCase().includes(lowerSearch)
                )
            );
        }

        if (filterValue === "noPhoto") {
            temp = temp.filter((u) => !u.hasPhoto);
        }

        setFilteredUsers(temp);
    };

    const handleSearch = (val: string) => {
        setSearchTerm(val);
    };

    const handleFilterChange = (value: string) => {
        setFilterValue(value);
    };

    const openModal = (record: UserWithPhoto) => {
        setSelectedUser(record);
        const userPhotos = allPhotos.filter((p) => p.user === record.user_id);
        setSelectedUserPhotos(userPhotos);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
        setSelectedUserPhotos([]);
    };

    const handleDeletePhoto = async (photoId: number) => {
        try {
            await deletePhoto(photoId);
            setSelectedUserPhotos((prev) => prev.filter((p) => p.photo_id !== photoId));
            setAllPhotos((prev) => prev.filter((p) => p.photo_id !== photoId));
            antMessage.success("Photo deleted");
        } catch (error) {
            console.error("Failed to delete photo:", error);
            antMessage.error("Failed to delete photo");
        }
    };

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!selectedUser) return;
        const files = e.target.files;
        if (!files || files.length === 0) return;

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (!file.name.toLowerCase().endsWith(".jpg")) {
                    antMessage.error("Only .jpg files are allowed");
                    continue;
                }
                const newPhoto = await uploadPhoto(selectedUser.user_id, file);
                setSelectedUserPhotos((prev) => [...prev, newPhoto]);
                setAllPhotos((prev) => [...prev, newPhoto]);
            }
            antMessage.success("Photo(s) uploaded successfully");
        } catch (error) {
            console.error("Upload failed:", error);
            antMessage.error("Upload failed");
        } finally {
            e.target.value = "";
        }
    };

    const columns: ColumnsType<UserWithPhoto> = [
        { title: "First Name", dataIndex: "fname", key: "fname" },
        { title: "Last Name", dataIndex: "lname", key: "lname" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Role", dataIndex: "role", key: "role", width: 120 },
        {
            title: "Face Photos Added",
            dataIndex: "hasPhoto",
            key: "hasPhoto",
            render: (value: boolean) => (value ? "Yes" : "No"),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button type="primary" onClick={() => openModal(record)}>
                        Manage
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className={styles.codesContainer}>
            <div className={styles.header}>
                <SearchBar value={searchTerm} onChange={handleSearch} />
                <Select
                    value={filterValue}
                    onChange={handleFilterChange}
                    style={{ width: 165, marginLeft: 8 }}
                    options={[
                        { label: "All", value: "all" },
                        { label: "Users without photos", value: "noPhoto" },
                    ]}
                />
            </div>

            <Table<UserWithPhoto>
                columns={columns}
                dataSource={filteredUsers}
                loading={loading}
                rowKey="user_id"
                pagination={{ pageSize: 10 }}
            />

            <Modal
                title="Manage Face Photos"
                open={isModalOpen}
                onCancel={closeModal}
                footer={null}
            >
                {selectedUser && (
                    <div className={styles.modalContent}>
                        <p>
                            <b>{selectedUser.fname} {selectedUser.lname}</b>
                        </p>
                        <p>
                            Please upload photos if you haven't done it yet. It is recommended to upload around 5-7 photos so that the system can recognise you better. Please make sure your face is clearly visible in your photos, it is not covered and you are looking directly into the camera.
                        </p>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            multiple
                            accept=".jpg,image/jpeg"
                            style={{ display: "none" }}
                        />

                        <Button type="dashed" onClick={handleUploadClick} className={styles.uploadButton}>
                            Upload
                        </Button>

                        <div className={styles.photosContainer}>
                            {selectedUserPhotos.map((photo) => {
                                const fileName = photo.photo_path?.split("/")?.pop() || "";
                                return (
                                    <div key={photo.photo_id} className={styles.photoBox}>
                                        <span className={styles.photoName}>{fileName}</span>
                                        <span
                                            className={styles.closeIcon}
                                            onClick={() => handleDeletePhoto(photo.photo_id)}
                                        >
                      ×
                    </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default FacesPage;
