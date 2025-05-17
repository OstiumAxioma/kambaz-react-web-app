//import React from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
/*b2*/
export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h1>Sign up</h1>
      <Form.Control 
        placeholder="username" 
        className="wd-username mb-2" 
      />
      <Form.Control 
        placeholder="password" 
        type="password" 
        className="wd-password mb-2" 
      />
      <Form.Control 
        placeholder="verify password"
        type="password" 
        className="wd-password-verify mb-2" 
      />
      <Link 
        to="/Kambaz/Account/Profile" 
        className="btn btn-primary w-100 mb-2"
      >
        Sign up
      </Link>
      <Link 
        to="/Kambaz/Account/Signin"
        className="btn btn-link w-100"
      >
        Sign in
      </Link>
    </div>
  );
}
