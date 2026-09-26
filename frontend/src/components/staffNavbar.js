import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";

export default function StaffNavbar({ staffName, onLogout }) {
    return (
        <nav className="staffNavbar" aria-label="Staff">
            <Link to="/staff/dashboard" className="staffNavbarBrand">
                <img src={logo} alt="" />
                FORA SA
            </Link>
            <p className="staffWelcome">Welcome Back, <strong>{staffName}</strong>!</p>
            <button type="button" className="staffLogout" onClick={onLogout}>Log Out</button>
        </nav>
    );
}