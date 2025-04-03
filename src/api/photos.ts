const API_URL = "http://127.0.0.1:8000";

export interface Photo {
    photo_id: number;
    photo_path: string;
    user: number; // или user_id, в зависимости от вашего API
}

export async function getPhotos(): Promise<Photo[]> {
    const response = await fetch(`${API_URL}/photos/`);
    if (!response.ok) {
        throw new Error("Failed to fetch photos");
    }
    return response.json();
}

export async function deletePhoto(photoId: number): Promise<void> {
    const response = await fetch(`${API_URL}/photos/${photoId}/`, {
        method: "DELETE",
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
    });
    if (!resp.ok) {
        throw new Error("Failed to upload photo");
    }
    return resp.json();
}