import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ApplicantDashboard.css';

const ApplicantDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [documentFile, setDocumentFile] = useState(null);

  // ✅ Move fetchApplications outside of useEffect
  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/applications', {

        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(res.data);
    } catch (err) {
      console.error('Error fetching applications:', err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('dob', dob);
    formData.append('address', address);
    if (documentFile) formData.append('document', documentFile);

    try {
      await axios.post('http://localhost:5000/api/applications/apply', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Application submitted successfully✅,Check the status for more info');
      setFullName('');
      setDob('');
      setAddress('');
      setDocumentFile(null);
      fetchApplications(); // ✅ Now this works
    } catch (err) {
      alert('Error submitting application');
      console.error('Submit Error:', err);
    }
  };

  return (
    <div>
      <h2>Applicant Dashboard</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload Document (PDF/Image):</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setDocumentFile(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Submit Application</button>
      </form>

      <h3>Your Applications Status</h3>
      <p id='p1'>Once your application submited ,The current status uploaded below</p>
      <p id='p2'>And if the status shows approved ,That means your passport has been verified and that will reach u soon as per your adderss details</p>
      <ul>
        {applications.map((app) => (
          <li key={app._id}>
            {app.fullName} – Officer Status: {app.verification?.officerVerified || 'Pending'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicantDashboard;
