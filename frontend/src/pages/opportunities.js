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

const fallbackOpportunities = [
    {
        id: 1,
        title: "Dog Walking",
        description: "Help give shelter dogs their daily exercise and human socialization, essential for their well-being and adopt-ability.",
        hours: "2hrs/session",
        location: "PTN 11, Reydal, Tarlton, Gauteng. Wolfelea AH.",
        image: null,
        tags: ["Outdoor", "Urgent"],
    },
    {
        id: 2,
        title: "Puppy Play Dates",
        description: "Help Play, socialize and interact with our younger dogs and puppies. Help pups develop confidence and trust in people.",
        hours: "2hrs/session",
        location: "PTN 11, Reydal, Tarlton, Gauteng. Wolfelea AH.",
        image: null,
        tags: ["Outdoor"],
    },
    {
        id: 3,
        title: "Cattery Care",
        description: "Care for rescued kittens and cats - feeding, socialisation, litter management and gentle handling.",
        hours: "2hrs/session",
        location: "PTN 11, Reydal, Tarlton, Gauteng. Wolfelea AH.",
        image: null,
        tags: ["Indoor"],
    },
    {
        id: 4,
        title: "Shelter Maintenance",
        description: "Help keep our rescue safe, clean and welcoming. Tasks include painting, repairs, gardening and general upkeep.",
        hours: "3hrs/session",
        location: "PTN 11, Reydal, Tarlton, Gauteng. Wolfelea AH.",
        image: null,
        tags: ["Outdoor", "Indoor"],
    },
];

export default function Opportunities() {
    const [opportunities, setOpportunities] = useState(fallbackOpportunities);
    const [activeFilter, setActiveFilter] = useState("All Roles");

    useEffect(() => {
        fetch("/api/opportunities")
            .then((res) => (res.ok ? res.json() : Promise.reject()))
            .then(setOpportunities)
            .catch(() => {});
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
                    {visibleOpportunities.map((opp) => (
                        <article key={opp.id} className="oppCard">
                            {opp.image && <img className="oppCardImg" src={opp.image} alt="" />}
                            <div className="oppCardBody">
                                <div className="oppCardHead">
                                    <h2>{opp.title}</h2>
                                    <div className="oppCardTags">
                                        {opp.tags?.map((tag) => (
                                            <span
                                                key={tag}
                                                className={`tag${tag === "Urgent" ? " tagUrgent" : ""}`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <p className="oppCardText">{opp.description}</p>
                                <div className="oppCardMeta">
                                    <span><FiClock aria-hidden="true" /> {opp.hours}</span>
                                    <span><FiMapPin aria-hidden="true" /> {opp.location}</span>
                                </div>
                                <Link to="/register" className="btn btnTeal" id="oppCardBtn">
                                    <img src={volunteerIcon} alt="" />
                                    Volunteer
                                </Link>
                            </div>
                        </article>
                    ))}
                </section>
            </main>

            <Footer />
        </div>
    );
}