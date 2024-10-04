import React, { useState, useEffect } from 'react';

const EditRestaurantForm = ({ restaurant, onUpdate }) => {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [openHours, setOpenHours] = useState('');

    useEffect(() => {
        if (restaurant) {
            setName(restaurant.name);
            setContact(restaurant.contact);
            setAddress(restaurant.address);
            setOpenHours(restaurant.open_hours);
        }
    }, [restaurant]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = { name, contact, address, open_hours: openHours };
        await onUpdate(restaurant.id, updatedData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Редагувати Ресторан</h2>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Назва" required />
            <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Контакт" required />
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Адреса" required />
            <input type="text" value={openHours} onChange={(e) => setOpenHours(e.target.value)} placeholder="Години роботи" required />
            <button type="submit">Оновити</button>
        </form>
    );
};

export default EditRestaurantForm;
