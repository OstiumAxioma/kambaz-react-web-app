import { useState, useEffect } from "react";
import { useParams } from "react-router";
import PeopleTable from "../Courses/People/Table";
import * as client from "./client";
import { FormControl } from "react-bootstrap";

export default function Users() {
 const [users, setUsers] = useState<any[]>([]);
 const [role, setRole] = useState("");
 const [name, setName] = useState("");
 const filterUsersByName = async (name: string) => {
   setName(name);
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