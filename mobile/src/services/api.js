import axios from 'axios';
import { Platform } from 'react-native';

// Use local LAN IP for physical device support
const API_URL = 'http://192.168.0.122:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const uploadMeasurementImage = async (imageUri, gender, userId = 1) => {
    const formData = new FormData();
    formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'measurement.jpg',
    });
    formData.append('gender', gender);
    formData.append('userId', userId);

    try {
        const response = await api.post('/measurements/process', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export const getStyles = async () => {
    try {
        const response = await api.get('/styles');
        return response.data;
    } catch (error) {
        console.error('Error fetching styles:', error);
        throw error;
    }
};

export default api;
