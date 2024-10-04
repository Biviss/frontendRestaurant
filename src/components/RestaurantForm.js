import React, { useState } from 'react';

const RestaurantForm = ({ onCreate }) => {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [openHours, setOpenHours] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const restaurantData = { name, contact, address, open_hours: openHours };
        await onCreate(restaurantData);
        setName('');
        setContact('');
        setAddress('');
        setOpenHours('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Додати Ресторан</h2>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Назва" required />
            <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Контакт" required />
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Адреса" required />
            <input type="text" value={openHours} onChange={(e) => setOpenHours(e.target.value)} placeholder="Години роботи" required />
            <button type="submit">Додати</button>
        </form>
    );
};

export default RestaurantForm;
