import {API_URL} from "../constants/constants.ts";

export interface Photo {
    photo_id: number;
    photo: string;
    user: number;
}

export async function getPhotos(): Promise<Photo[]> {
    const response = await fetch(`${API_URL}/photos/`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch photos");
    }
    return response.json();
}

export async function deletePhoto(photoId: number): Promise<void> {
    const response = await fetch(`${API_URL}/photos/${photoId}/`, {
        method: "DELETE",
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to delete photo");
    }
}

export async function uploadPhoto(userId: number, file: File): Promise<Photo> {
    const formData = new FormData();
    formData.append("user_id", userId.toString());
    formData.append("file", file);

    const resp = await fetch(`${API_URL}/photos/upload/`, {
        method: "POST",
        body: formData,
        credentials: "include",
    });
    if (!resp.ok) {
        throw new Error("Failed to upload photo");
    }
    return resp.json();
}