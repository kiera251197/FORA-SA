import { Link } from "react-router-dom";
import StaffNavbar from "../../components/staffNavbar";
import StaffFooter from "../../components/staffFooter";
import { getStaffName, clearStaffSession } from "../../utils/staffAuth";
import { useNavigate } from "react-router-dom";
import "./staff.css";

export default function StaffDashboard() {
    const navigate = useNavigate();

    return (
        <div className="staffPage">
            <StaffNavbar staffName={getStaffName()} onLogout={() => { clearStaffSession(); navigate("/staff/login"); }} />
            
            <main className="container staffMain">
                <p className="staffEyebrow">FORA STAFF</p>
                <h1>Dashboard</h1>
                <section className="staffCard">
                    <p>I will get to the dash soonish...</p>
                    <div className="staffCardActions" style={{ justifyContent: "flex-start" }}>
                        <Link to="/staff/announcements/new" className="btn btnTeal">Add Announcement</Link>
                        <Link to="/staff/opportunities/new" className="btn btnTeal">Add Opportunity</Link>
                    </div>
                </section>
            </main>
            <StaffFooter />
        </div>
    );
}