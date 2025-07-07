import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", userData);
      loginUser(res.data.token);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="userForm">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Username</label>
        <input
          type="text"
          value={userData.username}
          onChange={(e) => setUserData({ ...userData, username: e.target.value })}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error" style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
