import { useState } from "react";
import "./App.css";
import Login from "./Login";
import Register from "./Register";
import CreateStudent from "./components/CreateStudent";
import UpdateStudent from "./components/UpdateStudent";
import GetAll from "./components/GetAll";
import GetStudentById from "./components/GetStudentById";
import DeleteStudent from "./components/DeleteStudent";
 
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
 
  const [showRegister, setShowRegister] = useState(false);
 
  const [activeForm, setActiveForm] = useState("getAll");
 
  const role = localStorage.getItem("role");
 
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
  };
 
  if (!isLoggedIn) {
    return showRegister ? (
      <Register onBackToLogin={() => setShowRegister(false)} />
    ) : (
      <Login
        onLoginSuccess={() => setIsLoggedIn(true)}
        onShowRegister={() => setShowRegister(true)}
      />
    );
  }
 
  return (
    <div className="app">
      <div className="top-bar">
        <h1>Student Management System</h1>
 
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
 
      <div className="button-group">
        {role === "Admin" && (
          <>
            <button onClick={() => setActiveForm("create")}>
              Create
            </button>
 
            <button onClick={() => setActiveForm("update")}>
              Update
            </button>
 
            <button onClick={() => setActiveForm("delete")}>
              Delete
            </button>
          </>
        )}
 
        <button onClick={() => setActiveForm("getAll")}>
          Get All
        </button>
 
        <button onClick={() => setActiveForm("getById")}>
          Get By ID
        </button>
      </div>
 
      <div className="content-section">
        {activeForm === "create" && role === "Admin" && (
          <CreateStudent />
        )}
 
        {activeForm === "update" && role === "Admin" && (
          <UpdateStudent />
        )}
 
        {activeForm === "delete" && role === "Admin" && (
          <DeleteStudent />
        )}
 
        {activeForm === "getAll" && <GetAll />}
 
        {activeForm === "getById" && <GetStudentById />}
      </div>
    </div>
  );
}
 
export default App;
 