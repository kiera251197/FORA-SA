import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import footerDesktop from "../assets/images/footerBGDesktop.jpg";
import footerTablet from "../assets/images/footerBGTablet.jpg";
import footerMobile from "../assets/images/footerBGMobile.jpg";

export default function StaffFooter() {
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
                    <nav aria-label="Staff internal portals">
                        <h3>Staff Internal Portals</h3>
                        <Link to="/staff/dashboard">Dashboard</Link>
                        <Link to="/staff/volunteer-applications">Volunteer Applications</Link>
                        <Link to="/staff/opportunities/new">Add Opportunity</Link>
                        <Link to="/staff/announcements/new">Add Announcement</Link>
                    </nav>
                </div>

                <div className="footerSocial">
                    <h3>Follow Us</h3>
                    <a href="https://www.facebook.com/groups/friendsofrescuedanimals/" aria-label="FORA SA on Facebook"><FaFacebook /></a>
                </div>
                <p className="footerCopy">© 2026 FORA SA - Friends of Rescued Animals. All Rights Reserved.</p>
            </div>
        </footer>
    );
}