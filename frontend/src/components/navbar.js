import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/images/logo.svg";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Our Story", to: "/story" },
  { label: "Volunteer", to: "/volunteer" },
  { label: "Opportunities", to: "/opportunities" },
  { label: "Announcements", to: "/announcements" },
  { label: "Contact Us", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar" aria-label="Main">
      <Link to="/" className="navbarBrand">
        <img src={logo} alt="" />
      </Link>

      <button
        className="navbarToggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mainMenu"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <FiX /> : <FiMenu />}
      </button>

      <ul id="mainMenu" className={`navbarMenu${open ? " isOpen" : ""}`} onClick={() => setOpen(false)}>
        {navItems.map(({ label, to }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === "/"}
              className={({ isActive }) => `navLink${isActive ? " navLinkActive" : ""}`}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}