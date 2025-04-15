import React, { useEffect, useState, useRef } from "react";
import { Button, App } from "antd";
import { Photo, getPhotos, deletePhoto, uploadPhoto } from "../../api/photos";
import { User } from "../../api/users";
import styles from "./ProfilePhotosTab.module.css";

interface Props {
    user: User;
}

const ProfilePhotosTab: React.FC<Props> = ({ user }) => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { message } = App.useApp(); // Для notifications antd, если нужно

    useEffect(() => {
        if (user) {
            fetchUserPhotos();
        }
    }, [user]);

    const fetchUserPhotos = async () => {
        try {
            const allPhotos = await getPhotos(); // тот же метод, что и в FacesPage
            const userPhotos = allPhotos.filter((p) => p.user === user.user_id);
            setPhotos(userPhotos);
        } catch (error) {
            console.error("Failed to fetch user photos:", error);
            message.error("Failed to load photos");
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!user || !e.target.files?.length) return;

        const files = e.target.files;
        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (!file.name.toLowerCase().endsWith(".jpg")) {
                    message.error("Only .jpg files are allowed");
                    continue;
                }
                const newPhoto = await uploadPhoto(user.user_id, file);
                setPhotos((prev) => [...prev, newPhoto]);
            }
            message.success("Photo(s) uploaded successfully");
        } catch (err) {
            console.error("Upload failed:", err);
            message.error("Upload failed");
        } finally {
            e.target.value = "";
        }
    };

    const handleDeletePhoto = async (photoId: number) => {
        try {
            await deletePhoto(photoId);
            setPhotos((prev) => prev.filter((p) => p.photo_id !== photoId));
            message.success("Photo deleted");
        } catch (error) {
            console.error("Failed to delete photo:", error);
            message.error("Failed to delete photo");
        }
    };

    return (
        <div className={styles.photosContainer}>
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

            <div className={styles.photoGrid}>
                {photos.map((p) => (
                    <div key={p.photo_id} className={styles.photoBox}>
                        <span className={styles.photoName}>{p.photo}</span>
                        <span className={styles.deleteIcon} onClick={() => handleDeletePhoto(p.photo_id)}>
              ×
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfilePhotosTab;
