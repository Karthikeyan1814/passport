import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css'; // Optional

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('applicant');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
        role,
      });

      alert('Registration successful. Please login.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <h2>Registation Page</h2>
      <p>Register the account based on your role</p>
      <p>Fill all details to register</p>
      <form onSubmit={handleRegister} className="register-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="register-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="register-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="register-input"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="register-input"
        >
          <option value="applicant">Applicant</option>
          <option value="verifying_officer">Verifying Officer</option>
          <option value="police">Police</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="register-button">Register</button>
        {error && <p className="register-error">{error}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
