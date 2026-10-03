import { Link, useNavigate } from "react-router-dom";
import StaffNavbar from "../../components/staffNavbar";
import StaffFooter from "../../components/staffFooter";
import { getStaffName, clearStaffSession, staffFetch } from "../../utils/staffAuth";
import { FiEye } from "react-icons/fi";
import { useEffect, useState } from "react";
import { labelClassMap } from "../../components/labelPicker";
import "./staff.css";

const filters = ["All Roles", "Indoor", "Outdoor", "Weekend", "Weekday", "Urgent"];

export default function VolunteerApplications() {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [activeFilter, setActiveFilter] = useState("All Roles");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        staffFetch("/api/volunteers")
            .then((res) => (res.ok ? res.json() : Promise.reject()))
            .then((data) => setApplications(data || []))
            .catch(() => setApplications([]))
            .finally(() => setLoading(false));
    }, []);

    const visibleApplications =
        activeFilter === "All Roles"
            ? applications
            : applications.filter((a) => a.opportunity_tags?.includes(activeFilter));

    return (
        <div className="staffPage">
            <StaffNavbar staffName={getStaffName()} onLogout={() => { clearStaffSession(); navigate("/staff/login"); }} />

            <main className="container staffMain">
                <p className="staffSubHeading">FORA STAFF</p>
                <h1>Volunteer Notifications</h1>
                <p className="staffPageIntro">Recently submitted registrations.</p>

                <section className="staffCard">
                    <div className="staffFiltersRow">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                type="button"
                                className={`filterPill${activeFilter === filter ? " filterPillActive" : ""}`}
                                onClick={() => setActiveFilter(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    <div className="staffListGrid">
                        {loading ? (
                            <p className="staffListEmpty">Loading applications...</p>
                        ) : visibleApplications.length === 0 ? (
                            <p className="staffListEmpty">No applications found for this filter.</p>
                        ) : (
                            visibleApplications.map((app) => (
                                <article key={app.id} className="staffListCard">
                                    <div className="staffListCardHead">
                                        <div className="staffListTags">
                                            {app.opportunity_tags?.map((tag) => (
                                                <span key={tag} className={`labelPill ${labelClassMap[tag] || "labelIndoor"}`}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <Link to={`/staff/volunteerApplications/${app.id}`} className="btn btnTeal staffListEditBtn">
                                            <FiEye aria-hidden="true" /> View
                                        </Link>
                                    </div>
                                    <h2 className="staffListTitle">{app.opportunity_title || "Opportunity"}</h2>
                                    <p className="staffApplicantName">{app.first_name} {app.last_name}</p>
                                    <p className="staffApplicantContact">{app.phone} / {app.email}</p>
                                </article>
                            ))
                        )}
                    </div>
                </section>
            </main>

            <StaffFooter />
        </div>
    );
}