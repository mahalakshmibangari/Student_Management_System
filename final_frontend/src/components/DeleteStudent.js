import { useState } from "react";
import axios from "axios";
 
function DeleteStudent() {
  const API_URL = "https://localhost:44328/Student";
 
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
 
  const deleteStudent = async () => {
    if (!id) {
      setMessage("ID is required");
      return;
    }
 
    try {
      const token = localStorage.getItem("token");
 
      const response = await axios.delete(
        `${API_URL}/delete?Id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
 
      setMessage(response.data.message);
      setId("");
    } catch (error) {
      setMessage("Error deleting student");
    }
  };
 
  return (
    <div className="form-box">
      <h3>Delete Student</h3>
 
      <div className="input-group">
        <span className="required-star">*</span>
        <input
          type="number"
          placeholder="Enter ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
 
      <button onClick={deleteStudent}>Delete</button>
 
      {message && <p className="message">{message}</p>}
    </div>
  );
}
 
export default DeleteStudent;
 