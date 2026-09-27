import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiUser, FiClock, FiMail, FiArrowRight, FiEye } from "react-icons/fi";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import heroDesktop from "../assets/images/heroHomeDesktop.png";
import heroTablet from "../assets/images/heroHomeTablet.png";
import heroMobile from "../assets/images/heroHomeMobile.png";
import volunteerIcon from "../assets/icons/volunteer.svg";
import "./home.css";

const quickActions = [
  { 
    icon: FiUser, 
    title: "Register", 
    text: "New volunteer? Fill out our registration form", 
    to: "/register" 
  },
  { 
    icon: FiClock, 
    title: "Book a Shift",
    text: "Schedule your time", 
    to: "/register" 
  },
  { 
    icon: FiMail, 
    title: "Contact FORA", 
    text: "Get in touch with us", 
    to: "/contact" 
  },
];

export default function Home() {
  const [announcements, setAnnouncements] = useState([]);
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    fetch("/api/opportunities")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setOpportunities((data || []).slice(0, 4)))
      .catch(() => setOpportunities([]));
  }, []);

  useEffect(() => {
    fetch("/api/announcements?limit=5")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setAnnouncements(data || []))
      .catch(() => setAnnouncements([]));
  }, []);

  const labelDotClassMap = {
    Urgent: "dotUrgent",
    "Shelter Update": "dotShelter",
    "Community News": "dotCommunity",
    Fundraiser: "dotFundraiser",
  };

  function getNormalizedLabels(rawLabels) {
    if (!rawLabels) return [];
    if (Array.isArray(rawLabels)) return rawLabels;
    return rawLabels.split(",").map((l) => l.trim());
  }

  return (
    <div className="home">
      <header className="hero">
        <Navbar />
        <picture>
          <source media="(min-width: 1024px)" srcSet={heroDesktop} />
          <source media="(min-width: 834px)" srcSet={heroTablet} />
          <img className="heroImg" src={heroMobile} alt="A golden retriever leaping across a green meadow" />
        </picture>
        <p className="heroCaption">
          Join FORA's <strong>volunteer community</strong> and make a real <strong>difference</strong> in
          the lives of rescued animals across <strong>South Africa</strong>.
        </p>
      </header>

      <main className="container">

        {/* Quick actions */}
        <section className="quickActions" aria-label="Quick actions">
          {quickActions.map(({ icon: Icon, title, text, to }) => (
            <Link key={title} to={to} className="actionCard">
              <span className="actionCardIcon"><Icon aria-hidden="true" /></span>
              <h2>{title}</h2>
              <p>{text}</p>
            </Link>
          ))}
        </section>

        {/* Volunteer opportunities */}
        <section className="section">
          <div className="sectionHead">
            <span className="subHeading">Get Involved</span>
            <h2>Featured Volunteer Opportunities</h2>
            <p>Find a role that fits your time, skills and passion.</p>
          </div>
          <div className="oppsGrid">
            {opportunities.length === 0 ? (
                <p style={{ color: "var(--white)" }}>No opportunities available right now.</p>
            ) : (
                opportunities.map((opp) => (
                    <article key={opp.id} className="oppCard" id="oppCard">
                        <h3>{opp.title}</h3>
                        <p>{opp.description}</p>
                        <Link to="/opportunities" className="btn btnIndigo">
                            <img src={volunteerIcon} alt="" />
                            Volunteer
                        </Link>
                    </article>
                ))
            )}
        </div>
        </section>

        {/* Announcements */}
        <section className="section">
          <div className="sectionHead sectionHeadRow">
            <div>
              <span className="subHeading">Keep In Touch</span>
              <h2>Latest Announcements</h2>
              <p>Stay informed with our official updates, announcements and news.</p>
            </div>
            <Link to="/announcements" className="btn btnTeal">View All <FiArrowRight aria-hidden="true" /></Link>
          </div>
          <ul className="announcements">
            {announcements.map((a) => {
              const primaryLabel = getNormalizedLabels(a.labels)[0];
              const dotClass = labelDotClassMap[primaryLabel] || "dotInfo";
              return (
                  <li key={a.id}>
                      <span className={`dot ${dotClass}`} />
                      <span className="announcementsText">{a.title}</span>
                  </li>
              );
          })}
        </ul>
        </section>

        {/* Volunteer form */}
        <section className="cta">
          <h2>Willing To Help Out?</h2>
          <p>
            Please take look at our volunteer form (compulsory for all FORA volunteers) and fill out your preferred
            activities and skills. This helps FORA to better plan for volunteer days.
          </p>
          <Link to="/volunteer-form" className="btn btnTeal"><FiEye aria-hidden="true" /> View Form</Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}