import { Link, useNavigate } from "react-router-dom";
import StaffNavbar from "../../components/staffNavbar";
import StaffFooter from "../../components/staffFooter";
import { getStaffName, clearStaffSession } from "../../utils/staffAuth";
import "./staff.css";

export default function ManageAnnouncements() {
    const navigate = useNavigate();

    return (
        <div className="staffPage">
            <StaffNavbar staffName={getStaffName()} onLogout={() => { clearStaffSession(); navigate("/staff/login"); }} />

            <main className="container staffMain">
                <p className="staffSubHeading">FORA STAFF</p>
                <h1>Announcements</h1>

                <section className="staffCard">
                    <p>A full list of announcements with edit/delete options is coming soon.</p>
                    <div className="staffCardActions" style={{ justifyContent: "flex-start" }}>
                        <Link to="/staff/announcements/new" className="btn btnTeal">Add Announcement</Link>
                        <Link to="/staff/dashboard" className="btn btnOutline">Back to Dashboard</Link>
                    </div>
                </section>
            </main>

            <StaffFooter />
        </div>
    );
}