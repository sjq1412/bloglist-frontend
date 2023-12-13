import React from 'react';
import { Routes, Route } from 'react-router-dom';

import BlogsPage from './pages/BlogsPage';
import BlogPage from './pages/BlogPage';
import UsersPage from './pages/UsersPage';
import UserPage from './pages/UserPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BlogsPage />} />
      <Route path="/blogs/:id" element={<BlogPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/:id" element={<UserPage />} />
    </Routes>
  );
};

export default AppRoutes;
