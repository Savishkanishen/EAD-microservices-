import React from 'react';

const AdminDashboard = ({ user, onLogout }) => {
  return (
    <div className="container mt-4">
      <h2>Welcome, Admin {user.name}</h2>
      <p>This is your admin dashboard.</p>
      {/* Render your fee/studentFee/payment components here */}
      <button className="btn btn-secondary" onClick={onLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
