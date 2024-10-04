import React, { useState } from 'react';

const MenuItemForm = ({ onCreate, restaurantId }) => {
    const [name, setName] = useState('');
    const [day, setDay] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const menuItemData = {
            name,
            day,
            price: parseFloat(price), 
        };

        try {
            await onCreate(restaurantId, menuItemData); 
            setName('');
            setDay('');
            setPrice('');
        } catch (error) {
            console.error('Error creating menu item:', error.response.data);
            alert('Error add menu: ' + error.response.data.detail || 'Any error');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Додати Пункт Меню</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Назва"
                required
            />
            <input
                type="text"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="День"
                required
            />
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Ціна"
                required
            />
            <button type="submit">Додати</button>
        </form>
    );
};

export default MenuItemForm;
