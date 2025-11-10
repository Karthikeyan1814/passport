import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css'; // Assuming you have some styles for the dashboard

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Admin Panel</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.email} — {user.role}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
