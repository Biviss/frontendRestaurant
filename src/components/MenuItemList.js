import React, { useEffect, useState } from 'react';
import { fetchMenuItems, deleteMenuItem } from '../api';
import EditMenuItemModal from './EditMenuItemModal';

const MenuItemList = ({ restaurantId }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const loadMenuItems = async () => {
            const items = await fetchMenuItems(restaurantId);
            setMenuItems(items);
        };

        loadMenuItems();
    }, [restaurantId]);

    const handleDelete = async (id) => {
        try {
            await deleteMenuItem(id);
            setMenuItems(menuItems.filter((item) => item.id !== id));
        } catch (error) {
            console.error('Error during deletion:', error);
        }
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
        setIsEditing(true);
    };

    const handleUpdate = (updatedItem) => {
        setMenuItems((prevItems) =>
            prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item)) 
        );
        setIsEditing(false);
        setSelectedItem(null);
    };

    return (
        <div>
            <h2>Меню</h2>
            {menuItems.map((item) => (
                <div key={item.id}>
                    <h3>{item.name}</h3>
                    <p>День: {item.day}</p>
                    <p>Ціна: {item.price}</p>
                    <button onClick={() => handleEdit(item)}>Редагувати</button>
                    <button onClick={() => handleDelete(item.id)}>Видалити</button>
                </div>
            ))}
            {isEditing && (
                <EditMenuItemModal
                    item={selectedItem}
                    onUpdate={handleUpdate}
                    onClose={() => setIsEditing(false)}
                />
            )}
        </div>
    );
};

export default MenuItemList;
