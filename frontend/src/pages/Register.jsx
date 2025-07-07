import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        name: userData.name,
        username: userData.username,
        email: userData.email,
        password: userData.password,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="userForm">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label>Name</label>
        <input
          type="text"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          required
        />
        <label>Username</label>
        <input
          type="text"
          value={userData.username}
          onChange={(e) => setUserData({ ...userData, username: e.target.value })}
          required
        />
        <label>Email</label>
        <input
          type="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          required
        />
        <label>Confirm Password</label>
        <input
          type="password"
          value={userData.confirmPassword}
          onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
          required
        />
        <button type="submit">Register</button>
      </form>
      {error && <p className="error" style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Register;
