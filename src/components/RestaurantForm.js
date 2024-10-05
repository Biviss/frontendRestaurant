import React, { useState } from 'react';
import MenuItemForm from './MenuItemForm';
import { createRestaurant, createMenuItem } from '../api'; 

const RestaurantForm = () => {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [openHours, setOpenHours] = useState('');
    const [restaurantId, setRestaurantId] = useState(null); 

    const handleRestaurantSubmit = async (e) => {
        e.preventDefault();
        const restaurantData = { name, contact, address, open_hours: openHours };

        try {
            const createdRestaurant = await createRestaurant(restaurantData); // Виклик функції createRestaurant
            setRestaurantId(createdRestaurant.id); 
            setName('');
            setContact('');
            setAddress('');
            setOpenHours('');
        } catch (error) {
            console.error('Error creating restaurant:', error.response ? error.response.data : error);
            alert('Error adding restaurant: ' + (error.response?.data.detail || 'Unknown error'));
        }
    };

    const handleMenuItemCreate = async (menuItemData) => {
        try {
            if (!restaurantId) {
                throw new Error('Restaurant ID is not set.');
            }
            await createMenuItem(restaurantId, menuItemData);
            alert('Menu item added successfully!');
        } catch (error) {
            console.error('Error adding menu item:', error.response ? error.response.data : error);
            alert('Error adding menu item: ' + (error.response?.data.detail || 'Unknown error'));
        }
    };

    return (
        <div>
            <form onSubmit={handleRestaurantSubmit}>
                <h2>Додати Ресторан</h2>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Назва"
                    required
                />
                <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Контакт"
                    required
                />
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Адреса"
                    required
                />
                <input
                    type="text"
                    value={openHours}
                    onChange={(e) => setOpenHours(e.target.value)}
                    placeholder="Години роботи"
                    required
                />
                <button type="submit">Додати</button>
            </form>
            {restaurantId && (
                <MenuItemForm onCreate={handleMenuItemCreate} restaurantId={restaurantId} />
            )}
        </div>
    );
};

export default RestaurantForm;
