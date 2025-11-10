import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/PoliceDashboard.css'; // Optional: Style file
import API_BASE_URL from '../config/api';

const PoliceDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [notes, setNotes] = useState('');
  const [selectedAppId, setSelectedAppId] = useState(null);

  useEffect(() => {
    fetchPendingApplications();
  }, []);

  const fetchPendingApplications = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`${API_BASE_URL}/api/police/pending`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setApplications(res.data);
    } catch (err) {
      console.error('Error fetching pending apps:', err);
    }
  };

  const handleVerify = async (id, isVerified, notes) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `${API_BASE_URL}/api/police/verify/${id}`,
        {
          verified: isVerified,
          notes: notes || 'Verified by police',
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Verification submitted.');
    } catch (err) {
      console.error('Verification error:', err);
      alert('Verification failed.');
    }
  };
  
  return (
    <div className="police-dashboard">
      <h2>👮 Police Dashboard</h2>
      {applications.length === 0 ? (
        <p>No applications pending police verification.</p>
      ) : (
        applications.map((app) => (
          <div key={app._id} className="application-card">
            <h3>{app.fullName}</h3>
            <p><strong>Date of Birth:</strong> {new Date(app.dob).toLocaleDateString()}</p>
            <p><strong>Address:</strong> {app.address}</p>

            <button onClick={() => setSelectedAppId(app._id)}>Add Notes & Verify</button>

            {selectedAppId === app._id && (
              <div className="verification-box">
                <textarea
                  placeholder="Enter police verification notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                <div className="button-group">
                <button onClick={() => handleVerify(app._id, 'Verified', notes)}>✔ Verify</button>
                <button className="reject" onClick={() => handleVerify(app._id, 'Rejected', notes)}>✖ Reject</button>

                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PoliceDashboard;
