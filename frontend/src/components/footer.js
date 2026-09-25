import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import footerDesktop from "../assets/images/footerBGDesktop.svg";
import footerTablet from "../assets/images/footerBGTablet.svg";
import footerMobile from "../assets/images/footerBGMobile.svg";
import Story from '../pages/story';


export default function Footer() {
  return (
    <footer className="footer">
      <picture className="footerBgWrap">
        <source media="(min-width: 1024px)" srcSet={footerDesktop} />
        <source media="(min-width: 834px)" srcSet={footerTablet} />
        <img className="footerBg" src={footerMobile} alt="" aria-hidden="true" />
      </picture>
      <div className="container">
        <div className="footerBrand">
          <h2>FORA SA</h2>
          <p className="footerTagline">Friends of Rescued Animals</p>
          <p className="footerAbout">
            A community hub for FORA staff members, volunteers, supporters and animal advocates.
          </p>
        </div>

        <div className="footerLinks">
          <nav aria-label="About and mission">
            <h3>About & Mission</h3>
            <Link to="/">Home</Link>
            <Link to="/story">Our Story</Link>
            <Link to="/contact">Contact Us</Link>
          </nav>
          <nav aria-label="Get involved">
            <h3>Get Involved</h3>
            <Link to="/register">Become a Volunteer</Link>
            <Link to="/opportunities">Volunteer Opportunities</Link>
            <Link to="/terms">Ts & Cs for Volunteering</Link>
          </nav>
          <nav aria-label="Staff">
            <h3>Staff</h3>
            <Link to="/staff/login">Staff Sign In</Link>
            <Link to="/staff/dashboard">Dashboard</Link>
          </nav>
        </div>

        <div className="footerSocial">
          <h3>Follow Us</h3>
          <a href="https://www.facebook.com/groups/friendsofrescuedanimals/" aria-label="FORA SA on Facebook"><FaFacebook /></a>
        </div>
        <p className="footerCopy">© 2026 FORA SA – Friends of Rescued Animals. All Rights Reserved.</p>
      </div>
    </footer>
  );
}