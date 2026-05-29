import { useEffect, useState } from "react";
import axios from "axios";
import {
  isString,
  isAlphanumeric,
  isValidCourse,
} from "../utils/validation";
 
function UpdateStudent() {
  const API_URL = "https://localhost:44328/Student";
 
  const [branches, setBranches] = useState([]);
 
  const [updateData, setUpdateData] = useState({
    id: "",
    name: "",
    roll: "",
    course: "",
  });
 
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
 
  const role = localStorage.getItem("role");
 
  useEffect(() => {
    getAllBranches();
  }, []);
 
  const getAllBranches = async () => {
    try {
      const token = localStorage.getItem("token");
 
      const response = await axios.get(
        `${API_URL}/getallbranches`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
 
      setBranches(response.data);
    } catch (error) {
      console.log("Error fetching branches");
    }
  };
 
  const updateStudent = async () => {
    let newErrors = {};
 
    if (!updateData.id) {
      newErrors.id = "ID is required";
    }
 
    if (updateData.name && !isString(updateData.name)) {
      newErrors.name = "Invalid name";
    }
 
    if (updateData.roll && !isAlphanumeric(updateData.roll)) {
      newErrors.roll = "Invalid roll";
    }
 
    if (updateData.course && !isValidCourse(updateData.course)) {
      newErrors.course = "Invalid course";
    }
 
    setErrors(newErrors);
 
    if (Object.keys(newErrors).length > 0) return;
 
    try {
      const token = localStorage.getItem("token");
 
      const response = await axios.put(
        `${API_URL}/update`,
        {
          id: parseInt(updateData.id),
          name: updateData.name || null,
          rollNumber: updateData.roll || null,
          course: updateData.course || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
 
      setMessage(response.data.message);
 
      setUpdateData({
        id: "",
        name: "",
        roll: "",
        course: "",
      });
 
      setErrors({});
    } catch (error) {
      if (error.response?.status === 403) {
        setMessage("Only Admin can update student details");
      } else {
        setMessage("Error updating student");
      }
    }
  };
 
  if (role !== "Admin") {
    return (
      <div className="form-box">
        <h3>Update Student</h3>
        <p className="error">
          Only Admin can access update functionality
        </p>
      </div>
    );
  }
 
  return (
    <div className="form-box">
      <h3>Update Student</h3>
 
      <div className="input-group">
        <span className="required-star">*</span>
        <input
          type="number"
          placeholder="ID"
          value={updateData.id}
          onChange={(e) =>
            setUpdateData({ ...updateData, id: e.target.value })
          }
        />
      </div>
      {errors.id && <div className="error">{errors.id}</div>}
 
      <div className="input-group">
        <input
          type="text"
          placeholder="Name (Optional)"
          value={updateData.name}
          onChange={(e) =>
            setUpdateData({ ...updateData, name: e.target.value })
          }
        />
      </div>
      {errors.name && <div className="error">{errors.name}</div>}
 
      <div className="input-group">
        <input
          type="text"
          placeholder="Roll (Optional)"
          value={updateData.roll}
          onChange={(e) =>
            setUpdateData({ ...updateData, roll: e.target.value })
          }
        />
      </div>
      {errors.roll && <div className="error">{errors.roll}</div>}
 
      <div className="input-group">
        <select
          value={updateData.course}
          onChange={(e) =>
            setUpdateData({ ...updateData, course: e.target.value })
          }
        >
          <option value="">Select Branch (Optional)</option>
 
          {branches.map((branch) => (
            <option key={branch.id} value={branch.name}>
              {branch.name}
            </option>
          ))}
        </select>
      </div>
      {errors.course && <div className="error">{errors.course}</div>}
 
      <button onClick={updateStudent}>Update</button>
 
      {message && <p className="message">{message}</p>}
    </div>
  );
}
 
export default UpdateStudent;
 