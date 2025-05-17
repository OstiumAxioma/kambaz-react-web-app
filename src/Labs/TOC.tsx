import Nav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router-dom";

export default function TOC() {
  const { pathname } = useLocation();
  
  return (
    <Nav variant="pills">
      <Nav.Item>
        <Nav.Link 
          to="/Labs/Lab1" 
          as={Link} 
          active={pathname === "/Labs/Lab1"}
        >
          Lab 1
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link 
          to="/Labs/Lab2" 
          as={Link} 
          active={pathname === "/Labs/Lab2"}
        >
          Lab 2
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link 
          to="/Labs/Lab3" 
          as={Link} 
          active={pathname === "/Labs/Lab3"}
        >
          Lab 3
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link 
          to="/Kambaz" 
          as={Link} 
          active={pathname === "/Kambaz"}
        >
          Kambaz
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="https://github.com/jannunzi">My GitHub</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}