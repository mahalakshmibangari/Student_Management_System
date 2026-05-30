# 🎓 Student Management System

A robust full-stack web application designed for managing student records. This project features a responsive frontend user interface connected to a secure .NET backend API, allowing full CRUD capabilities that have been successfully verified and tested using Postman.


## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript 
* **Backend:** .NET Web API (C#)
* **API Testing:** Postman (All endpoints fully verified)



## ✨ Features & CRUD Operations

The system cleanly handles core academic administration tasks through the following operations:
* **Create Student:** Register new students into the system with input validation.
* **Fetch All Students:** Retrieve a complete directory list of all registered students.
* **Get Student by ID:** Look up precise, detailed information for a single specific student.
* **Update Student:** Modify existing student records and details dynamically.
* **Delete Student:** Permanently remove student profiles from the administrative database.
* **Fetch Branches:** Retrieve a full list of available academic branches.



## 🚀 API Endpoints (Postman Verified)

The backend exposes a clean RESTful routing structure. Below are the tested actions hosted on port `44328`:

| HTTP Method | Endpoint Path | Parameter Style | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/Student/getall` | None | Retrieves all students from the database |
| **GET** | `/Student/getbyId` | Query String (`?Id=x`) | Retrieves a single student's details by their ID |
| **POST** | `/Student/create` | JSON Body | Creates and saves a new student record |
| **PUT** | `/Student/update` | JSON Body | Updates details of an existing student |
| **DELETE** | `/Student/delete` | Query String (`?Id=x`) | Deletes a student record from the system |
| **GET** | `/Student/getallbranches` | None | Retrieves all academic branches |

---

## 💻 How to Run the Project

### 1. Backend Setup (.NET)
1. Navigate to your backend project folder in your terminal.
2. Run the application to start the local server:
```bash
   dotnet run
Ensure the server is hosting the local API endpoint at https://localhost:44328.

2. Frontend Setup
Open your frontend folder.

Ensure your JavaScript API fetch URLs match the https://localhost:44328/Student/... endpoints.

Launch the index.html file directly in any modern web browser to view the interface.
