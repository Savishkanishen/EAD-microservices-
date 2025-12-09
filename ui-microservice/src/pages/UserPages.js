// src/pages/UsersPage.js
import React, { useState } from 'react';
import AddUserForm from '../components/AddUserForm';
import UserList from '../components/UserList';

const UsersPage = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshUsers = () => setRefreshKey(prev => prev + 1);

  return (
    <div className="container mt-4">
      <h2>User Management</h2>
      <UserList key={refreshKey} />
      <AddUserForm onUserAdded={refreshUsers} />
    </div>
  );
};

export default UsersPage;
