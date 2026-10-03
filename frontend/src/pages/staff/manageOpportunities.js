import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiPlus, FiEdit2 } from "react-icons/fi";
import StaffNavbar from "../../components/staffNavbar";
import StaffFooter from "../../components/staffFooter";
import { getStaffName, clearStaffSession } from "../../utils/staffAuth";
import "./staff.css";

const filters = ["All Roles", "Indoor", "Outdoor", "Weekend", "Weekday", "Urgent"];

const tagClassMap = {
    Urgent: "labelUrgent",
    Indoor: "labelIndoor",
    Outdoor: "labelOutdoor",
    Weekday: "labelWeekday",
    Weekend: "labelWeekend",
};

function formatDate(dateString) {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

export default function ManageOpportunities() {
    const navigate = useNavigate();
    const [opportunities, setOpportunities] = useState([]);
    const [activeFilter, setActiveFilter] = useState("All Roles");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/opportunities")
            .then((res) => (res.ok ? res.json() : Promise.reject()))
            .then((data) => setOpportunities(data || []))
            .catch(() => setOpportunities([]))
            .finally(() => setLoading(false));
    }, []);

    const visibleOpportunities =
        activeFilter === "All Roles"
            ? opportunities
            : opportunities.filter((opp) => opp.tags?.includes(activeFilter));

    return (
        <div className="staffPage">
            <StaffNavbar staffName={getStaffName()} onLogout={() => { clearStaffSession(); navigate("/staff/login"); }} />

            <main className="container staffMain">
                <div className="staffHeadRow">
                    <div>
                        <p className="staffSubHeading">FORA STAFF</p>
                        <h1>Opportunities</h1>
                        <p className="staffPageIntro">Add opportunities that appear in the volunteer highlights.</p>
                    </div>
                    <Link to="/staff/opportunities/new" className="btn btnTeal">
                        <FiPlus aria-hidden="true" /> Add
                    </Link>
                </div>

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
                            <p className="staffListEmpty">Loading opportunities...</p>
                        ) : visibleOpportunities.length === 0 ? (
                            <p className="staffListEmpty">No opportunities found for this filter.</p>
                        ) : (
                            visibleOpportunities.map((opp) => (
                                <article key={opp.id} className="staffListCard">
                                    <div className="staffListCardHead">
                                        <div className="staffListTags">
                                            {opp.tags?.map((tag) => (
                                                <span key={tag} className={`labelPill ${tagClassMap[tag] || "labelIndoor"}`}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <Link to={`/staff/opportunities/${opp.id}/edit`} className="btn btnTeal staffListEditBtn">
                                            <FiEdit2 aria-hidden="true" /> Edit
                                        </Link>
                                    </div>
                                    <h2 className="staffListTitle">{opp.title}</h2>
                                    {opp.created_at && <p className="staffListDate">{formatDate(opp.created_at)}</p>}
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