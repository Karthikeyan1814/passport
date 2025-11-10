import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';
import API_BASE_URL from '../config/api';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchApplications = async () => {
        try {
          const res = await axios.get(`${API_BASE_URL}/api/applications`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setApplications(res.data);
        } catch (err) {
          console.error('Failed to fetch applications', err);
          setApplications([]);
        } finally {
          setLoading(false);
        }
      };

    fetchApplications();
  }, [token]);

  const handleVerify = async (id) => {
    
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/admin/admin-verify/${id}`,
        {}, // no body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      alert(response.data.message || 'Application verified by Admin.');
  
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status: 'Admin Verified' } : app
        )
      );
    } catch (err) {
      console.error('Verification error', err.response?.data || err.message);
      alert('Failed to verify application. Check server logs for more info.');
    }
  };
  

  const handleIssuePassport = async (id) => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/admin/issue-passport/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Passport issued successfully. Applicant has been notified.');
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status: 'Passport Issued' } : app))
      );
    } catch (err) {
      console.error('Issue error', err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {loading ? (
        <p>Loading applications...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>DOB</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app.fullName}</td>
                <td>{app.dob}</td>
                <td>{app.status}</td>
                <td>
                  <button onClick={() => setSelectedApp(app)}>Details</button>
                  {app.status === 'Police Verified' && (
                    <button onClick={() => handleVerify(app._id)}>Verify</button>
                  )}
                  {app.status === 'Admin Verified' && (
                    <button onClick={() => handleIssuePassport(app._id)}>Issue Passport</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedApp && (
        <div className="modal">
          <h3>Application Details</h3>
          <p><strong>Name:</strong> {selectedApp.fullName}</p>
          <p><strong>DOB:</strong> {selectedApp.dob}</p>
          <p><strong>Address:</strong> {selectedApp.address}</p>
          <p><strong>Status:</strong> {selectedApp.status}</p>
          <button onClick={() => setSelectedApp(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
