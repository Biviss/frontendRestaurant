import React, { useEffect, useState } from 'react';
import { fetchRestaurants, createRestaurant, updateRestaurant, deleteRestaurant, createMenuItem, fetchMenuItems } from '../api';
import RestaurantForm from './RestaurantForm';
import EditRestaurantForm from './EditRestaurantForm';
import MenuItemList from './MenuItemList';
import MenuItemForm from './MenuItemForm';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [editingRestaurant, setEditingRestaurant] = useState(null);
    const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

    useEffect(() => {
        const loadRestaurants = async () => {
            const data = await fetchRestaurants();
            setRestaurants(data);
        };
        loadRestaurants();
    }, []);

    const handleCreateRestaurant = async (restaurantData) => {
        const newRestaurant = await createRestaurant(restaurantData);
        setRestaurants([...restaurants, newRestaurant]);
    };

    const handleUpdateRestaurant = async (restaurantId, updatedData) => {
        const updatedRestaurant = await updateRestaurant(restaurantId, updatedData);
        setRestaurants(restaurants.map(r => (r.id === restaurantId ? updatedRestaurant : r)));
        setEditingRestaurant(null);
    };

    const handleDeleteRestaurant = async (restaurantId) => {
        await deleteRestaurant(restaurantId);
        setRestaurants(restaurants.filter(r => r.id !== restaurantId));
    };

    const handleMenuItemCreate = async (restaurantId, menuItemData) => {
        await createMenuItem(restaurantId, menuItemData);
        setSelectedRestaurantId(restaurantId);
    };

    return (
        <div>
            <h1>Список Ресторанів</h1>
            <RestaurantForm onCreate={handleCreateRestaurant} />
            {editingRestaurant && (
                <EditRestaurantForm restaurant={editingRestaurant} onUpdate={handleUpdateRestaurant} />
            )}
            <ul>
                {restaurants.map(restaurant => (
                    <li key={restaurant.id}>
                        <h2>{restaurant.name}</h2>
                        <p>Контакт: {restaurant.contact}</p>
                        <p>Адреса: {restaurant.address}</p>
                        <p>Години роботи: {restaurant.open_hours}</p>
                        <button onClick={() => setEditingRestaurant(restaurant)}>Редагувати</button>
                        <button onClick={() => handleDeleteRestaurant(restaurant.id)}>Видалити</button>
                        <button onClick={() => setSelectedRestaurantId(restaurant.id)}>Меню</button>
                        {selectedRestaurantId === restaurant.id && (
                            <div>
                                <MenuItemForm restaurantId={restaurant.id} onCreate={handleMenuItemCreate} />
                                <MenuItemList restaurantId={restaurant.id} />
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RestaurantList;
