import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css"; // 新增的CSS文件

export default function KambazNavigation() {
  const { pathname } = useLocation();
  const links = [
    { label: "Account", path: "/Kambaz/Account", icon: FaRegCircleUser },
    { label: "Dashboard", path: "/Kambaz/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses", path: "/Kambaz/Courses", icon: LiaBookSolid },
    { label: "Calendar", path: "/Kambaz/Calendar", icon: IoCalendarOutline },
    { label: "Inbox", path: "/Kambaz/Inbox", icon: FaInbox },
    { label: "Labs", path: "/Labs", icon: LiaCogSolid },
  ];

  return (
    <ListGroup id="wd-kambaz-navigation"
      style={{ width: 110 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <ListGroup.Item
        id="wd-neu-link"
        target="_blank"
        action
        href="https://www.northeastern.edu/"
        className="bg-black border-0 text-center neu-logo-item"
      >
        <img src="https://brand.northeastern.edu/wp-content/uploads/2025/01/MONOGRAM-red-2-1-1.svg" width="60px" alt="NEU" />
      </ListGroup.Item>
      {links.map((link, index) => (
        <ListGroup.Item
          key={index}
          to={link.path}
          as={NavLink}
          end
          className="text-center border-0 bg-black text-white sidebar-item"
        >
          <link.icon className="fs-2 text-danger mb-1" />
          <div className="sidebar-label">{link.label}</div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}