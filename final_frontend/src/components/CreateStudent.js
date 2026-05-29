import { useEffect, useState } from "react";
import axios from "axios";
import {
  isString,
  isAlphanumeric,
  isValidCourse,
} from "../utils/validation";
 
function CreateStudent() {
  const API_URL = "https://localhost:44328/Student";
 
  const [branches, setBranches] = useState([]);
 
  const [createData, setCreateData] = useState({
    name: "",
    roll: "",
    course: "",
  });
 
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
 
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
 
  const createStudent = async () => {
    let newErrors = {};
 
    if (!createData.name) {
      newErrors.name = "Name is required";
    } else if (!isString(createData.name)) {
      newErrors.name = "Name should contain only letters";
    }
 
    if (!createData.roll) {
      newErrors.roll = "Roll is required";
    } else if (!isAlphanumeric(createData.roll)) {
      newErrors.roll = "Roll must be alphanumeric";
    }
 
    if (!createData.course) {
      newErrors.course = "Course is required";
    } else if (!isValidCourse(createData.course)) {
      newErrors.course = "Course is invalid";
    }
 
    setErrors(newErrors);
 
    if (Object.keys(newErrors).length > 0) return;
 
    try {
      const token = localStorage.getItem("token");
 
const response = await axios.post(
  `${API_URL}/create`,
  {
    name: createData.name,
    rollNumber: createData.roll,
    course: createData.course,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
 
      setMessage(response.data.message);
 
      setCreateData({
        name: "",
        roll: "",
        course: "",
      });
 
      setErrors({});
    } catch (error) {
      setMessage("Error creating student");
    }
  };
 
  return (
    <div className="form-box">
      <h3>Create Student</h3>
 
      <div className="input-group">
        <span className="required-star">*</span>
        <input
          type="text"
          placeholder="Name"
          value={createData.name}
          onChange={(e) =>
            setCreateData({ ...createData, name: e.target.value })
          }
        />
      </div>
      {errors.name && <div className="error">{errors.name}</div>}
 
      <div className="input-group">
        <span className="required-star">*</span>
        <input
          type="text"
          placeholder="Roll"
          value={createData.roll}
          onChange={(e) =>
            setCreateData({ ...createData, roll: e.target.value })
          }
        />
      </div>
      {errors.roll && <div className="error">{errors.roll}</div>}
 
      <div className="input-group">
        <span className="required-star">*</span>
        <select
          value={createData.course}
          onChange={(e) =>
            setCreateData({ ...createData, course: e.target.value })
          }
        >
          <option value="">Select Branch</option>
 
          {branches.map((branch) => (
            <option key={branch.id} value={branch.name}>
              {branch.name}
            </option>
          ))}
        </select>
      </div>
      {errors.course && <div className="error">{errors.course}</div>}
 
      <button onClick={createStudent}>Submit</button>
 
      {message && <p className="message">{message}</p>}
    </div>
  );
}
 
export default CreateStudent;
 