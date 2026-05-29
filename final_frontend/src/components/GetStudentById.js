import { useState } from "react";
import axios from "axios";
 
function GetStudentById() {
  const API_URL = "https://localhost:44328/Student";
 
  const [id, setId] = useState("");
  const [student, setStudent] = useState(null);
  const [message, setMessage] = useState("");
 
  const getStudent = async () => {
    if (!id) {
      setMessage("ID is required");
      return;
    }
 
    try {
     const token = localStorage.getItem("token");
 
    const response = await axios.get(
    `${API_URL}/getbyId?Id=${id}`,
     {
     headers: {
      Authorization: `Bearer ${token}`,
     },
     }
    );
      setStudent(response.data);
      setMessage("");
    } catch (error) {
      setStudent(null);
      setMessage("No student found");
    }
  };
 
  return (
    <div className="form-box">
      <h3>Get Student By ID</h3>
 
      <div className="input-group">
        <span className="required-star">*</span>
        <input
          type="number"
          placeholder="Enter ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
 
      <button onClick={getStudent}>Get Student</button>
 
      {message && <p className="message">{message}</p>}
 
      {student && (
        <div className="student-details">
          <p>ID: {student.id}</p>
          <p>Name: {student.name}</p>
          <p>Roll No: {student.rollNumber}</p>
          <p>Course: {student.course}</p>
        </div>
      )}
    </div>
  );
}
 
export default GetStudentById;
 