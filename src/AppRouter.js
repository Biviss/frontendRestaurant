import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import MenuItemList from './components/MenuItemList';
import RestaurantForm from './components/RestaurantForm';
import RestaurantList from './components/RestaurantList';
import EditMenuItemModal from './components/EditMenuItemModal';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/restaurants" element={<RestaurantList />} />
        <Route path="/restaurants/new" element={<RestaurantForm />} />
        <Route path="/restaurants/:restaurantId/menu" element={<MenuItemList />} />
        <Route path="/restaurants/menu/edit/:menuItemId" element={<EditMenuItemModal />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
