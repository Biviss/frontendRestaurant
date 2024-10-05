import React, { useState } from 'react';
import { updateMenuItem } from '../api'; 

const EditMenuItemModal = ({ item, onUpdate, onClose }) => {
    const [name, setName] = useState(item.name);
    const [day, setDay] = useState(item.day);
    const [price, setPrice] = useState(item.price);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = { name, day, price: parseFloat(price) };

        try {
            const updatedItem = await updateMenuItem(item.id, updatedData);
            onUpdate(updatedItem);
            onClose();
        } catch (error) {
            console.error('Error updating menu item:', error);
            alert('Не вдалося оновити елемент меню');
        }
    };

    return (
        <div className="modal">
            <h2>Редагувати Меню</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Зберегти</button> 
            </form>
        </div>
    );
};

export default EditMenuItemModal;
