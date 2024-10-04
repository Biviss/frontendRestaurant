import React, { useEffect, useState } from 'react';
import { fetchMenuItems } from '../api';

const MenuItemList = ({ restaurantId }) => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const getMenuItems = async () => {
            const items = await fetchMenuItems(restaurantId);
            setMenuItems(items);
        };
        getMenuItems();
    }, [restaurantId]);

    return (
        <div>
            <h3>Меню Ресторану</h3>
            <ul>
                {menuItems.map(item => (
                    <li key={item.id}>
                        {item.name} - {item.day} - ${item.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MenuItemList;
