import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/LoginPage.css"; // Optional styling

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("email", user.email);

      // Navigate based on role
      if (user.role === "applicant") {
        navigate("/applicant-dashboard");
      } else if (user.role === "verifying_officer") {
        navigate("/verify-dashboard");
      } else if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (user.role === "police") {
        navigate("/police-dashboard");
      } else {
        setError("Unknown user role");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Invalid credentials or server error");
    }
  };

  return (
    <div className="login-container">
      <h2>Passport System Login</h2>
      <p id="p1">If you are new to applicant go and create the account </p>
      <p id="p2">Login as per your role</p>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
