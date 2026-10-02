import { Link, useNavigate } from "react-router-dom";
import { IoMegaphoneOutline } from "react-icons/io5";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import StaffNavbar from "../../components/staffNavbar";
import StaffFooter from "../../components/staffFooter";
import { getStaffName, clearStaffSession } from "../../utils/staffAuth";
import "./staff.css";

const dashboardCards = [
    {
        icon: IoMegaphoneOutline,
        title: "Announcements",
        text: "Manage what appears on the latest announcements page.",
        to: "/staff/announcements",
        label: "Announcements",
    },
    {
        icon: FaHandHoldingHeart,
        title: "Opportunities",
        text: "Add opportunities that appear in the volunteer highlights.",
        to: "/staff/opportunities",
        label: "Opportunities",
    },
    {
        icon: FiBell,
        title: "Volunteer Notifications",
        text: "View recently submitted volunteer registrations",
        to: "/staff/volunteer-applications",
        label: "Volunteer Notifications",
    },
];

export default function StaffDashboard() {
    const navigate = useNavigate();

    return (
        <div className="staffPage">
            <StaffNavbar staffName={getStaffName()} onLogout={() => { clearStaffSession(); navigate("/staff/login"); }} />

            <main className="container staffMain">
                <p className="staffSubHeading">FORA STAFF</p>
                <h1>Administration Dashboard</h1>

                <section className="staffDashGrid" aria-label="Staff sections">
                    {dashboardCards.map(({ icon: Icon, title, text, to, label }) => (
                        <article key={title} className="staffDashCard">
                            <span className="staffDashIcon"><Icon aria-hidden="true" /></span>
                            <h2>{title}</h2>
                            <p>{text}</p>
                            <Link to={to} className="btn btnTeal staffDashBtn">
                                <Icon aria-hidden="true" /> {label}
                            </Link>
                        </article>
                    ))}
                </section>
            </main>

            <StaffFooter />
        </div>
    );
}