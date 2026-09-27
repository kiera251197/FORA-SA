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

const fallbackAnnouncements = [
    {
        id: 1,
        title: "Volunteers Needed This Weekend",
        description: "We urgently need 8 volunteers this Saturday for our Adoption Day. If you can help between 09:00 and 15:00, please sign up via FORA Connect",
        labels: ["Urgent"],
        created_at: "2026-08-04",
    },
    {
        id: 2,
        title: "Spring Food Drive",
        description: "Our food supply for our animals is always a main priority. We are asking the community to donate dog and cat food. Drop-offs are accepted at FORA on weekdays 08:00 - 17:00, or you can donate to us to help assist.",
        labels: ["Urgent"],
        created_at: "2026-08-04",
    },
    {
        id: 3,
        title: "Puppy Play Sessions Now Available!",
        description: "Our Puppy Play sessions are now in full swing! Spaces are limited to 6 volunteers. Book your spot through the calendar and fill out your volunteer registration!",
        labels: ["Shelter Update"],
        created_at: "2026-07-28",
    },
    {
        id: 4,
        title: "R50 000 Medical Fund Milestone Reached",
        description: "Thanks to your incredible generosity, we have reached our R50 000 medical fund target - ensuring emergency veterinary care for every animal in our care this year.",
        labels: ["Community News"],
        created_at: "2026-07-27",
    },
];

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
    const [announcements, setAnnouncements] = useState(fallbackAnnouncements);
    const [activeFilter, setActiveFilter] = useState("All");

    useEffect(() => {
        fetch("/api/announcements")
            .then((res) => (res.ok ? res.json() : Promise.reject()))
            .then((data) => {
                if (data && data.length > 0) {
                    setAnnouncements(data);
                }
            })
            .catch(() => {});
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
                    {visibleAnnouncements.map((a) => {
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
                    })}
                </section>
            </main>

            <Footer />
        </div>
    );
}