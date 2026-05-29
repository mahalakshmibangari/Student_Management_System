import { useState } from "react";
import axios from "axios";
import "./Login.css";
 
function Register({ onBackToLogin }) {
  const API_URL = "https://localhost:44328/Auth/register";
 
  const [registerData, setRegisterData] = useState({
    userName: "",
    password: "",
  });
 
  const handleRegister = async () => {
    try {
      const response = await axios.post(API_URL, {
        userName: registerData.userName,
        password: registerData.password,
      });
 
      alert(response.data.message);
      onBackToLogin();
    } catch (error) {
      alert("Registration failed");
    }
  };
 
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Register</h2>
 
        <input
          type="text"
          placeholder="Username"
          value={registerData.userName}
          onChange={(e) =>
            setRegisterData({
              ...registerData,
              userName: e.target.value,
            })
          }
        />
 
        <input
          type="password"
          placeholder="Password"
          value={registerData.password}
          onChange={(e) =>
            setRegisterData({
              ...registerData,
              password: e.target.value,
            })
          }
        />
 
        <button onClick={handleRegister}>Register</button>
 
        <p onClick={onBackToLogin} style={{ cursor: "pointer" }}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}
 
export default Register;