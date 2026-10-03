import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiClock, FiMapPin } from "react-icons/fi";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import heroDesktop from "../assets/images/heroOppsDesktop.png";
import heroTablet from "../assets/images/heroOppsTablet.png";
import heroMobile from "../assets/images/heroOppsMobile.png";
import volunteerIcon from "../assets/icons/volunteer.svg";
import "./opportunities.css";

const filters = ["All Roles", "Weekday", "Weekend", "Indoor", "Outdoor", "Urgent"];

const tagClassMap = {
    "Urgent": "tagUrgent",
    "Indoor": "tagIndoor",
    "Outdoor": "tagOutdoor",
    "Weekday": "tagWeekday",
    "Weekend": "tagWeekend",
    "Shelter Update": "tagShelter",
    "Community News": "tagCommunity",
    "Fundraiser": "tagFundraiser",
};

export default function Opportunities() {
    const [opportunities, setOpportunities] = useState([]);
    const [activeFilter, setActiveFilter] = useState("All Roles");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/opportunities")
            .then((res) => (res.ok ? res.json() : Promise.reject()))
            .then((data) => {
                setOpportunities(data || []);
            })
            .catch((err) => {
                console.error("Failed to load opportunities:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const visibleOpportunities =
        activeFilter === "All Roles"
            ? opportunities
            : opportunities.filter((opp) => opp.tags?.includes(activeFilter));

    return (
        <div className="opportunities">
            <header className="hero opportunitiesHero">
                <Navbar />
                <picture>
                    <source media="(min-width: 1024px)" srcSet={heroDesktop} />
                    <source media="(min-width: 834px)" srcSet={heroTablet} />
                    <img className="heroImg" src={heroMobile} alt="" />
                </picture>
            </header>

            <main className="container">
                <section className="section oppsIntro">
                    <h1>Volunteer Opportunities</h1>
                    <p>Every role makes a difference. Find that one that is right for you.</p>
                </section>

                <section className="oppsFilters" aria-label="Filter opportunities">
                    <div className="oppsFiltersRow">
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
                </section>

                <section className="section oppsGrid" aria-label="Volunteer opportunities">
                    {loading ? (
                        <p style={{ color: "var(--navy)", fontStyle: "italic" }}>Loading opportunities...</p>
                    ) : visibleOpportunities.length === 0 ? (
                        <p style={{ color: "var(--navy)" }}>No opportunities found for this filter.</p>
                    ) : (
                        visibleOpportunities.map((opp) => (
                            <article key={opp.id} className="oppCard">
                                {opp.image && (
                                    <div className="oppCardImgWrap">
                                        <img className="oppCardImg" src={opp.image} alt={opp.title} />
                                    </div>
                                )}
                                <div className="oppCardBody">
                                    <div className="oppCardHead">
                                        <h2>{opp.title}</h2>
                                        <div className="oppCardTags">
                                            {opp.tags?.map((tag) => (
                                                <span key={tag} className={`tag ${tagClassMap[tag] || "tagIndoor"}`}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <p className="oppCardText">{opp.description}</p>

                                    <div className="oppCardMeta">
                                        {opp.hours && (
                                            <span>
                                                <FiClock aria-hidden="true" /> {opp.hours}
                                            </span>
                                        )}
                                        {opp.location && (
                                            <span>
                                                <FiMapPin aria-hidden="true" /> {opp.location}
                                            </span>
                                        )}
                                    </div>

                                    <Link to={`/volunteer?opportunity=${opp.id}`} className="btn btnTeal" id="oppCardBtn">Volunteer</Link>
                                </div>
                            </article>
                        ))
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
}