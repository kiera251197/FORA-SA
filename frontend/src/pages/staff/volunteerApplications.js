import { Link, useNavigate } from "react-router-dom";
import StaffNavbar from "../../components/staffNavbar";
import StaffFooter from "../../components/staffFooter";
import { getStaffName, clearStaffSession } from "../../utils/staffAuth";
import "./staff.css";

export default function VolunteerApplications() {
    const navigate = useNavigate();

    return (
        <div className="staffPage">
            <StaffNavbar staffName={getStaffName()} onLogout={() => { clearStaffSession(); navigate("/staff/login"); }} />

            <main className="container staffMain">
                <p className="staffSubHeading">FORA STAFF</p>
                <h1>Volunteer Notifications</h1>

                <section className="staffCard">
                    <p>Recently submitted volunteer registrations will appear here soon.</p>
                    <div className="staffCardActions" style={{ justifyContent: "flex-start" }}>
                        <Link to="/staff/dashboard" className="btn btnOutline">Back to Dashboard</Link>
                    </div>
                </section>
            </main>

            <StaffFooter />
        </div>
    );
}