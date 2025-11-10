import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Sidebar.css'; // Optional: for additional styling

const Sidebar = ({ role }) => {
  const location = useLocation();

  const getLinks = () => {
    switch (role) {
      case 'applicant':
        return [
          { path: '/dashboard', label: 'Dashboard' },
          { path: '/status', label: 'Application Status' },
          { path: '/logout', label: 'Logout' },
        ];
      case 'verifier':
        return [
          { path: '/verify', label: 'Verify Applications' },
          { path: '/logout', label: 'Logout' },
        ];
      case 'admin':
        return [
          { path: '/admin', label: 'Admin Panel' },
          { path: '/manage-users', label: 'Manage Users' },
          { path: '/reports', label: 'Reports' },
          { path: '/logout', label: 'Logout' },
        ];
      default:
        return [];
    }
  };

  return (
    <motion.div
      className="sidebar"
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="sidebar-header">
        <h2>{role.charAt(0).toUpperCase() + role.slice(1)} Panel</h2>
      </div>
      <ul className="sidebar-links">
        {getLinks().map((link, idx) => (
          <li key={idx} className={location.pathname === link.path ? 'active' : ''}>
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Sidebar;
