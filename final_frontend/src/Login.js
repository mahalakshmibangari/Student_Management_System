import { useState } from "react";
import axios from "axios";
import "./Login.css";
 
function Login({ onLoginSuccess, onShowRegister }) {
  //const API_URL = "https://localhost:44328/Auth/login";
    const API_URL = "/Auth/login";
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });
 
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
 
  const handleLogin = async () => {
    let newErrors = {};
 
    if (!loginData.userName) {
      newErrors.userName = "Username is required";
    }
 
    if (!loginData.password) {
      newErrors.password = "Password is required";
    }
 
    setErrors(newErrors);
 
    if (Object.keys(newErrors).length > 0) return;
 
    try {
      const response = await axios.post(API_URL, {
        userName: loginData.userName,
        password: loginData.password,
      });
 
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("role", response.data.role);
 
      setMessage("Login successful");
 
      onLoginSuccess();
    } catch (error) {
      alert("Invalid user credentials");
    }
  };
 
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
 
        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            value={loginData.userName}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                userName: e.target.value,
              })
            }
          />
        </div>
        {errors.userName && (
          <div className="error">{errors.userName}</div>
        )}
 
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                password: e.target.value,
              })
            }
          />
        </div>
        {errors.password && (
          <div className="error">{errors.password}</div>
        )}
 
        <button onClick={handleLogin}>Login</button>
 
        <p
          className="register-link"
          onClick={onShowRegister}
        >
          Don't have an account? Register
        </p>
 
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
 
export default Login;