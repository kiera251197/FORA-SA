import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import heroDesktop from "../assets/images/heroAnnDesktop.png";
import heroTablet from "../assets/images/heroAnnTablet.png";
import heroMobile from "../assets/images/heroAnnMobile.png";
import "./announcements.css";

const filters = ["All", "Urgent Requests", "Fundraisers", "Shelter Updates", "Community News"];

const filterToLabel = {
    "Urgent Requests": "Urgent",
    "Fundraisers": "Fundraiser",
    "Shelter Updates": "Shelter Update",
    "Community News": "Community News",
};

const labelClassMap = {
    "Urgent": "labelUrgent",
    "Shelter Update": "labelShelter",
    "Community News": "labelCommunity",
    "Fundraiser": "labelFundraiser",
};

function formatDate(dateString) {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function getNormalizedLabels(rawLabels) {
    if (!rawLabels) return [];
    if (Array.isArray(rawLabels)) return rawLabels;
    return rawLabels.split(",").map((l) => l.trim());
}

export default function Announcements() {
     const [announcements, setAnnouncements] = useState([]);
    const [activeFilter, setActiveFilter] = useState("All");

    useEffect(() => {
        fetch("/api/announcements")
            .then((res) => (res.ok ? res.json() : Promise.reject()))
            .then((data) => setAnnouncements(data || []))
            .catch(() => setAnnouncements([]));
    }, []);
    
    const visibleAnnouncements =
    activeFilter === "All"
        ? announcements
        : announcements.filter((a) => {
              const labelArray = getNormalizedLabels(a.labels);
              return labelArray.includes(filterToLabel[activeFilter]);
          });

    return (
        <div className="announcementsPage">
            <header className="hero announcementsHero">
                <Navbar />
                <picture>
                    <source media="(min-width: 1024px)" srcSet={heroDesktop} />
                    <source media="(min-width: 834px)" srcSet={heroTablet} />
                    <img className="heroImg" src={heroMobile} alt="" />
                </picture>
            </header>

            <main className="container">
                <section className="section announcementsIntro">
                    <h1>Announcements</h1>
                    <p>The latest news, updates and urgent notifications from FORA.</p>
                </section>

                <section className="announcementsFilters" aria-label="Filter announcements">
                    <div className="announcementsFiltersRow">
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

                <section className="section announcementsGrid" aria-label="Announcements">
                    {visibleAnnouncements.length === 0 ? (
                        <p className="announcementsEmpty">No announcements to show right now — check back soon.</p>
                    ) : (
                        visibleAnnouncements.map((a) => {
                            const primaryLabel = a.labels?.[0] || "Shelter Update";
                            const labelClass = labelClassMap[primaryLabel] || "labelShelter";

                            return (
                                <article key={a.id} className="announcementCard">
                                    <div className="announcementCardHead">
                                        <div className="labelPillsContainer">
                                            {a.labels?.map((lbl) => (
                                                <span key={lbl} className={`labelPill ${labelClassMap[lbl] || "labelShelter"}`}>
                                                    {lbl}
                                                </span>
                                            ))}
                                        </div>
                                        <span className="announcementDate">{formatDate(a.created_at)}</span>
                                    </div>
                                    <h2 className={`announcementTitle ${labelClass}Text`}>{a.title}</h2>
                                    <p className="announcementText">{a.description}</p>
                                </article>
                            );
                        })
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
}