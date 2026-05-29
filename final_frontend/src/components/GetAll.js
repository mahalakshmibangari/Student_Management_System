import { useState } from "react";
import axios from "axios";
import StudentTable from "./StudentTable";
 
function GetAll() {
  const API_URL = "https://localhost:44328/Student";
 
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");
 
  const getAllStudents = async () => {
    try {
      const token = localStorage.getItem("token");
 
     const response = await axios.get(`${API_URL}/getall`, {
    headers: {
     Authorization: `Bearer ${token}`,
     },
    });
 
      console.log(response.data);
 
      setStudents(response.data);
 
      if (response.data.length === 0) {
        setMessage("No students found");
      } else {
        setMessage("");
      }
    } catch (error) {
      console.log(error);
      setMessage("Error fetching students");
    }
  };
 
  return (
    <div className="form-box">
      <h3>Get All Students</h3>
 
      <button onClick={getAllStudents}>Fetch All Students</button>
 
      {message && <p>{message}</p>}
 
      {students.length > 0 && <StudentTable students={students} />}
    </div>
  );
}
 
export default GetAll;