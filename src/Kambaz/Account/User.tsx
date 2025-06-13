import { useState, useEffect } from "react";
import { useParams } from "react-router";
import PeopleTable from "../Courses/People/Table";
import * as client from "./client";
import { FormControl, Alert } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

export default function Users() {
 const [users, setUsers] = useState<any[]>([]);
 const [role, setRole] = useState("");
 const [name, setName] = useState("");
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");
 const [success, setSuccess] = useState("");

 useEffect(() => {
   console.log("Current search name:", name);
 }, [name]);

 const createUser = async () => {
    try {
        setLoading(true);
        setError("");
        setSuccess("");
        
        const newUser = {
            firstName: "New",
            lastName: `User${users.length + 1}`,
            username: `newuser${Date.now()}`,
            password: "password123",
            email: `email${users.length + 1}@neu.edu`,
            section: "S101",
            role: "STUDENT",
        };

        const user = await client.createUser(newUser);
        setUsers([...users, user]);
        setSuccess("User created successfully!");
    } catch (err) {
        console.error("Error creating user:", err);
        setError("Failed to create user. Please try again.");
    } finally {
        setLoading(false);
    }
 };

 const filterUsersByName = async (name: string) => {
   setName(name);
   console.log("Filtering users by name:", name);
   if (name) {
     const users = await client.findUsersByPartialName(name);
     setUsers(users);
   } else {
     fetchUsers();
   }
 };
 
 const filterUsersByRole = async (role: string) => {
   console.log("Filtering by role:", role); // Debug log
   setRole(role);
   try {
     if (role) {
       console.log("Fetching users by role:", role); // Debug log
       const filteredUsers = await client.findUsersByRole(role);
       console.log("Filtered users:", filteredUsers); // Debug log
       setUsers(filteredUsers);
     } else {
       console.log("Fetching all users"); // Debug log
       const allUsers = await client.findAllUsers();
       console.log("All users:", allUsers); // Debug log
       setUsers(allUsers);
     }
   } catch (error) {
     console.error("Error filtering users:", error);
   }
 };

 const { uid } = useParams();
 const fetchUsers = async () => {
   try {
     const allUsers = await client.findAllUsers();
     console.log("Initial users fetch:", allUsers); // Debug log
     setUsers(allUsers);
   } catch (error) {
     console.error("Error fetching users:", error);
   }
 };

 useEffect(() => {
   fetchUsers();
 }, [uid]);

return (
    <div>
        {error && <Alert variant="danger" onClose={() => setError("")} dismissible>{error}</Alert>}
        {success && <Alert variant="success" onClose={() => setSuccess("")} dismissible>{success}</Alert>}
        <button 
            onClick={createUser} 
            className="float-end btn btn-danger wd-add-people"
            disabled={loading}
        >
            <FaPlus className="me-2" />
            {loading ? "Creating..." : "Add User"}
        </button>
        <h3>Users</h3>
        <FormControl onChange={(e) => filterUsersByName(e.target.value)} placeholder="Search people"
                className="float-start w-25 me-2 wd-filter-by-name" />
        <select 
        value={role} 
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role"
        >
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
        </select>
        <PeopleTable users={users} />
    </div>
 );
}