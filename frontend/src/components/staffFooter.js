import { Link } from "react-router-dom";

export default function StaffFooter() {
    return (
        <footer className="staffFooter">
            <div className="container staffFooterInner">
                <div className="footerBrand">
                    <h2>FORA SA</h2>
                    <p className="footerTagline">Friends of Rescued Animals</p>
                    <p className="footerAbout">
                        A community hub for FORA staff members, volunteers, supporters and animal advocates.
                    </p>
                </div>

                <nav aria-label="Staff internal portals">
                    <h3>Staff Internal Portals</h3>
                    <Link to="/staff/dashboard">Dashboard</Link>
                    <Link to="/staff/volunteer-applications">Volunteer Applications</Link>
                    <Link to="/staff/opportunities/new">Add Opportunity</Link>
                    <Link to="/staff/announcements/new">Add Announcement</Link>
                </nav>
            </div>
            <p className="footerCopy">© 2026 FORA SA – Friends of Rescued Animals. All Rights Reserved.</p>
        </footer>
    );
}