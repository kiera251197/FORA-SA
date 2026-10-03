import { Link, useNavigate } from "react-router-dom";
import StaffNavbar from "../../components/staffNavbar";
import StaffFooter from "../../components/staffFooter";
import { getStaffName, clearStaffSession } from "../../utils/staffAuth";
import { FiPlus, FiEdit2 } from "react-icons/fi";
import { labelClassMap } from "../../components/labelPicker";
import { useEffect, useState } from "react";
import "./staff.css";

const filters = ["All Roles", "Fundraiser", "Shelter Update", "Community News", "Urgent"];

const labelTextClassMap = {
    Urgent: "labelUrgentText",
    "Shelter Update": "labelShelterText",
    "Community News": "labelCommunityText",
    Fundraiser: "labelFundraiserText",
};

function formatDate(dateString) {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

export default function ManageAnnouncements() {
    const navigate = useNavigate();
    const [announcements, setAnnouncements] = useState([]);
    const [activeFilter, setActiveFilter] = useState("All Roles");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/announcements?limit=100")
            .then((res) => (res.ok ? res.json() : Promise.reject()))
            .then((data) => setAnnouncements(data || []))
            .catch(() => setAnnouncements([]))
            .finally(() => setLoading(false));
    }, []);

    const visibleAnnouncements =
        activeFilter === "All Roles"
            ? announcements
            : announcements.filter((a) => a.labels?.includes(activeFilter));

    return (
        <div className="staffPage">
            <StaffNavbar staffName={getStaffName()} onLogout={() => { clearStaffSession(); navigate("/staff/login"); }} />

            <main className="container staffMain">
                <div className="staffHeadRow">
                    <div>
                        <p className="staffSubHeading">FORA STAFF</p>
                        <h1>Announcements</h1>
                        <p className="staffPageIntro">Manage what appears on the public latest announcements page.</p>
                    </div>
                    <Link to="/staff/announcements/new" className="btn btnTeal" id="addBtn">
                        <FiPlus aria-hidden="true" /> Add
                    </Link>
                </div>

                <section className="staffCard">
                    <div className="staffFiltersRow">
                        {filters.map((filter) => (
                            <button key={filter} type="button" className={`filterPill${activeFilter === filter ? " filterPillActive" : ""}`} onClick={() => setActiveFilter(filter)}>
                                {filter}
                            </button>
                        ))}
                    </div>

                    <div className="staffListGrid">
                        {loading ? (
                            <p className="staffListEmpty">Loading announcements...</p>
                        ) : visibleAnnouncements.length === 0 ? (
                            <p className="staffListEmpty">No announcements found for this filter.</p>
                        ) : (
                            visibleAnnouncements.map((a) => {
                                const primaryLabel = a.labels?.[0] || "Shelter Update";
                                const titleClass = labelTextClassMap[primaryLabel] || "labelShelterText";

                                return (
                                    <article key={a.id} className="staffListCard">
                                        <div className="staffListCardHead">
                                            <div className="staffListTags">
                                                {a.labels?.map((lbl) => (
                                                    <span key={lbl} className={`labelPill ${labelClassMap[lbl] || "labelShelter"}`}>
                                                        {lbl}
                                                    </span>
                                                ))}
                                            </div>
                                            <Link to={`/staff/announcements/${a.id}/edit`} className="btn btnTeal staffListEditBtn">
                                                <FiEdit2 aria-hidden="true" /> Edit
                                            </Link>
                                        </div>
                                        <h2 className={`staffListTitle ${titleClass}`}>{a.title}</h2>
                                        {a.created_at && <p className="staffListDate">{formatDate(a.created_at)}</p>}
                                    </article>
                                );
                            })
                        )}
                    </div>
                </section>
            </main>

            <StaffFooter />
        </div>
    );
}