import React from 'react';

const StudentPage = ({ user, onLogout }) => {
  return (
    <div className="container mt-4">
      <h2>Welcome, {user.name}</h2>
      <p>This page is under development for students.</p>
      <button className="btn btn-secondary" onClick={onLogout}>Logout</button>
    </div>
  );
};

export default StudentPage;
