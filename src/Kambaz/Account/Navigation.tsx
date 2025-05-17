import { Link, useLocation } from "react-router-dom";

export default function AccountNavigation() {
  const location = useLocation();

  const navItems = [
    { path: "Signin", label: "Signin" },
    { path: "Signup", label: "Signup" },
    { path: "Profile", label: "Profile" }
  ];

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={`/Kambaz/Account/${item.path}`}
          id={`wd-account-${item.path.toLowerCase()}-link`}
          className={`list-group-item border-0 d-flex align-items-center ${
            location.pathname.includes(item.path) ? "active" : "text-danger"
          }`}
        >
          <span className="flex-grow-1">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
