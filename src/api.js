import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const fetchRestaurants = async () => {
    const response = await axios.get(`${API_URL}/restaurants/`);
    return response.data;
};

export const createRestaurant = async (restaurantData) => {
    const response = await axios.post(`${API_URL}/restaurants/`, restaurantData);
    return response.data;
};

export const updateRestaurant = async (restaurantId, updatedData) => {
    const response = await axios.put(`${API_URL}/restaurants/${restaurantId}/`, updatedData);
    return response.data;
};

export const deleteRestaurant = async (restaurantId) => {
    await axios.delete(`${API_URL}/restaurants/${restaurantId}/`);
};

export const createMenuItem = async (restaurantId, menuItemData) => {
    const response = await axios.post(`${API_URL}/restaurants/${restaurantId}/menu/`, menuItemData);
    return response.data;
};

export const fetchMenuItems = async (restaurantId) => {
    const response = await axios.get(`${API_URL}/restaurants/${restaurantId}/menu/`);
    return response.data;
};
