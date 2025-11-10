import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/VerifyDashboard.css';

const VerifyDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notes, setNotes] = useState({}); // Track notes for each app

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/verify', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(res.data);
      } catch (err) {
        setError('Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  const handleNoteChange = (id, value) => {
    setNotes((prev) => ({ ...prev, [id]: value }));
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const officerNote = notes[id] || '';

      await axios.put(
        `http://localhost:5000/api/verify/${id}`,
        { status, officerNotes: officerNote },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`Application ${status}`);
      setApplications((prevApps) =>
        prevApps.map((app) =>
          app._id === id
            ? {
                ...app,
                verification: {
                  ...app.verification,
                  officerVerified: status,
                  officerNotes: officerNote,
                },
              }
            : app
        )
      );
    } catch (err) {
      alert('Failed to update status');
    }
  };

  if (loading) return <div className="dashboard-loader">Loading applications...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  return (
    <div className="verify-dashboard">
      <h2 className="dashboard-title">Verifying Officer Panel</h2>
      {applications.length === 0 ? (
        <p>No applications to verify</p>
      ) : (
        <ul className="application-list">
          {applications.map((app) => (
            <li key={app._id} className="application-card">
              <div className="app-details">
                <p><strong>Name:</strong> {app.name || 'N/A'}</p>
                <p><strong>Date of Birth:</strong> {app.dob || 'N/A'}</p>
                <p><strong>Address:</strong> {app.address || 'N/A'}</p>
                <p><strong>Status:</strong> {app.verification?.officerVerified || 'Pending'}</p>
                {app.verification?.officerNotes && (
                  <p><strong>Notes:</strong> {app.verification.officerNotes}</p>
                )}
              </div>
              <div className="note-section">
                <textarea
                  placeholder="Enter officer notes..."
                  value={notes[app._id] || ''}
                  onChange={(e) => handleNoteChange(app._id, e.target.value)}
                  rows={2}
                  className="note-textarea"
                />
              </div>
              <div className="action-buttons">
                <button
                  className="approve-btn"
                  onClick={() => updateStatus(app._id, 'Verified')}
                >
                  Approve
                </button>
                <button
                  className="reject-btn"
                  onClick={() => updateStatus(app._id, 'Rejected')}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VerifyDashboard;
