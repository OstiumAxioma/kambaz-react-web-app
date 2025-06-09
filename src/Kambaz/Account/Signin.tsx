import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import { FormControl, Button, Alert } from "react-bootstrap";
import * as client from "./client";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const signin = async () => {
    setError("");
    
    try {
      const user = await client.signin(credentials);
      if (!user) return;
      dispatch(setCurrentUser(user));
      navigate("/Kambaz/Dashboard");
    } catch (error: any) {
      console.error("Sign in error:", error);
      setError(error.response?.data?.message || "Invalid username or password");
    }
  };
  
  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <FormControl 
        value={credentials.username || ""}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        className="mb-2" 
        placeholder="Username" 
        id="wd-username" 
      />
      <FormControl 
        value={credentials.password || ""}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        className="mb-2" 
        placeholder="Password" 
        type="password" 
        id="wd-password" 
      />
      <Button onClick={signin} id="wd-signin-btn" className="w-100 mb-2">
        Sign in
      </Button>
      
      <div className="text-center">
        <Link id="wd-signup-link" to="/Kambaz/Account/Signup">
          Don't have an account? Sign up
        </Link>
      </div>
      
      <hr />
      <div className="mt-3">
        <small className="text-muted">
          <strong>Test Accounts:</strong><br />
          <strong>FACULTY:</strong> iron_man / stark123, ring_bearer / shire123<br />
          <strong>STUDENT:</strong> dark_knight / wayne123, thor_odinson / mjolnir123<br />
          <strong>TA:</strong> black_widow / romanoff123, strider / aragorn123<br />
          <strong>ADMIN:</strong> ada / 123
        </small>
      </div>
    </div>
  );
} 