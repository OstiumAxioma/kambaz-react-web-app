import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
// import { Link } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { FormControl, FormSelect } from "react-bootstrap";
import * as client from "../../Account/client";

export default function PeopleDetails() {
  const { uid} = useParams();
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    navigate(-1);
  };

  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
    setName(`${user.firstName} ${user.lastName}`);
    setEmail(user.email || "");
    setRole(user.role || "");
  };

  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { 
      ...user, 
      firstName, 
      lastName,
      email: email,
      role: role
    };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    setEditingField(null);
    navigate(-1);
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  if (!uid) return null;

  const startEditing = (field: string) => {
    setEditing(true);
    setEditingField(field);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveUser();
    }
  };

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <hr />
      <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete" > Delete </button>
      <button onClick={() => navigate(-1)}
              className="btn btn-secondary float-start float-end me-2 wd-cancel" > Cancel </button>
      <button onClick={() => navigate(-1)} className="btn position-fixed end-0 top-0 wd-close-details">
        <IoCloseSharp className="fs-1" /> </button>
      <div className="text-center mt-2"> <FaUserCircle className="text-secondary me-2 fs-1" /> </div><hr />
      
      {/* Name editing */}
      <div className="text-danger fs-4 mb-3">
        {!editing && (
          <FaPencil onClick={() => startEditing("name")}
              className="float-end fs-5 mt-2 wd-edit" /> )}
        {editing && editingField === "name" && (
          <FaCheck onClick={saveUser}
              className="float-end fs-5 mt-2 me-2 wd-save" /> )}
        {!editing && (
          <div className="wd-name"
               onClick={() => startEditing("name")}>
            {user.firstName} {user.lastName}</div>)}
        {editing && editingField === "name" && (
          <FormControl className="w-75 wd-edit-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}/>)}
      </div>

      {/* Email editing */}
      <div className="mb-3">
        <b>Email:</b>
        {!editing && (
          <FaPencil onClick={() => startEditing("email")}
              className="float-end fs-5 mt-2 wd-edit-email" /> )}
        {editing && editingField === "email" && (
          <FaCheck onClick={saveUser}
              className="float-end fs-5 mt-2 me-2 wd-save-email" /> )}
        {!editing && (
          <span className="wd-email ms-2" onClick={() => startEditing("email")}>
            {user.email}</span>)}
        {editing && editingField === "email" && (
          <FormControl className="w-75 ms-2 wd-edit-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}/>)}
      </div>

      {/* Role editing */}
      <div className="mb-3">
        <b>Role:</b>
        {!editing && (
          <FaPencil onClick={() => startEditing("role")}
              className="float-end fs-5 mt-2 wd-edit-role" /> )}
        {editing && editingField === "role" && (
          <FaCheck onClick={saveUser}
              className="float-end fs-5 mt-2 me-2 wd-save-role" /> )}
        {!editing && (
          <span className="wd-role ms-2" onClick={() => startEditing("role")}>
            {user.role}</span>)}
        {editing && editingField === "role" && (
          <FormSelect className="w-75 ms-2 wd-edit-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            onKeyDown={handleKeyDown}>
            <option value="STUDENT">Student</option>
            <option value="FACULTY">Faculty</option>
            <option value="TA">Teaching Assistant</option>
            <option value="ADMIN">Administrator</option>
          </FormSelect>)}
      </div>

      <b>Login ID:</b>        <span className="wd-login-id">      {user.loginId}      </span> <br />
      <b>Section:</b>         <span className="wd-section">       {user.section}      </span> <br />
      <b>Total Activity:</b>  <span className="wd-total-activity">{user.totalActivity}</span> </div> ); }