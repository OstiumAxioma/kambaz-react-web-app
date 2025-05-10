import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <h1>Welcome to Zhong Yun's Kambaz</h1>
      <p>
        <Link to="/Kambaz">Go to Lab Exercises</Link>
      </p>
    </div>
  );
}
