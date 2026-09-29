import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiTarget, FiUsers, FiTrendingUp, FiSmile, FiCalendar, FiHeart, FiShield, FiUserX, FiUserCheck, FiAlertCircle, FiGlobe, FiCheck } from "react-icons/fi";
import heroDesktop from "../assets/images/heroVolunteerDesktop.png";
import heroTablet from "../assets/images/heroVolunteerTablet.png";
import heroMobile from "../assets/images/heroVolunteerMobile.png";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ThankYouModal from "../components/thankYouModal";
import "./volunteer.css";

const whyVolunteer = [
    { icon: FiTarget, text: "Make a direct, visible impact on animal lives." },
    { icon: FiUsers, text: "Build meaningful connections with a compassionate community." },
    { icon: FiTrendingUp, text: "Develop new skills and gain experience working with animals." },
    { icon: FiSmile, text: "Enjoy a sense of purpose and fulfilment every session." },
];

const expectations = [
    { icon: FiCalendar, text: "Communicate schedule changes in advance." },
    { icon: FiHeart, text: "Treat all animals and staff with respect and care." },
    { icon: FiShield, text: "Follow FORA guidelines and health & safety procedures." },
];

const guidelines = [
    { icon: FiUserX, text: "Do not handle animals alone without supervision." },
    { icon: FiUserCheck, text: "Follow FORA staff members' guidance and instructions." },
    { icon: FiAlertCircle, text: "Report any concerns to the shift supervisor immediately." },
    { icon: FiGlobe, text: "Maintain confidentiality of sensitive shared information." },
];

const infoCards = [
    { title: "Why Volunteer?", items: whyVolunteer },
    { title: "Volunteer Expectations", items: expectations },
    { title: "Volunteer Guidelines", items: guidelines },
];

export default function Volunteer() {
    const [searchParams] = useSearchParams();
    const preselectedOpportunity = searchParams.get("opportunity") || "";

    const [opportunities, setOpportunities] = useState([]);
    const [shifts, setShifts] = useState([]);

    const [form, setForm] = useState({
        firstName: "", lastName: "", email: "", phone: "",
        emergencyContactName: "", emergencyContactPhone: "",
        opportunityId: preselectedOpportunity,
        shiftId: "",
        skills: "", motivation: "",
    });
    const [agreed, setAgreed] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        fetch("/api/opportunities")
            .then((res) => (res.ok ? res.json() : Promise.reject()))
            .then((data) => setOpportunities(data || []))
            .catch(() => setOpportunities([]));

        fetch("/api/shifts")
            .then((res) => (res.ok ? res.json() : Promise.reject()))
            .then((data) => setShifts(data || []))
            .catch(() => setShifts([]));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!agreed) return;
        setSubmitting(true);
        try {
            const res = await fetch("/api/volunteers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error("Failed to submit");
            setSubmitted(true);
        } catch (err) {
            console.error("Failed to submit volunteer application:", err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="volunteerPage">
            <header className="hero volunteerHero">
                <Navbar />
                <picture>
                    <source media="(min-width: 1024px)" srcSet={heroDesktop} />
                    <source media="(min-width: 834px)" srcSet={heroTablet} />
                    <img className="heroImg" src={heroMobile} alt="" />
                </picture>
            </header>

            <main className="container">
                <section className="section volunteerIntro">
                    <h1>Become a Volunteer</h1>
                    <p>Every hour you give changes lives.</p>
                </section>

                <section className="section infoGrid" aria-label="Volunteering information">
                    {infoCards.map(({ title, items }) => (
                        <article key={title} className="infoCard">
                            <h2>{title}</h2>
                            <ul className="infoList">
                                {items.map(({ icon: Icon, text }, i) => (
                                    <li key={i}>
                                        <span className="infoIcon"><Icon aria-hidden="true" /></span>
                                        <span>{text}</span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </section>

                <section className="section formCard">
                    <h2 className="formTitle">Volunteer Form</h2>

                    <form onSubmit={handleSubmit}>
                        <h3 className="formSectionHeading">Personal Information</h3>
                        <div className="formRow">
                            <label className="formField">
                                <span>Name: <em>*</em></span>
                                <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required />
                            </label>
                            <label className="formField">
                                <span>Surname: <em>*</em></span>
                                <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required />
                            </label>
                        </div>
                        <div className="formRow">
                            <label className="formField">
                                <span>Email Address: <em>*</em></span>
                                <input type="email" name="email" value={form.email} onChange={handleChange} required />
                            </label>
                            <label className="formField">
                                <span>Phone Number: <em>*</em></span>
                                <input type="tel" name="phone" value={form.phone} onChange={handleChange} required />
                            </label>
                        </div>

                        <h3 className="formSectionHeading">Emergency Contact</h3>
                        <div className="formRow">
                            <label className="formField">
                                <span>Contact Name: <em>*</em></span>
                                <input type="text" name="emergencyContactName" value={form.emergencyContactName} onChange={handleChange} required />
                            </label>
                            <label className="formField">
                                <span>Contact Phone: <em>*</em></span>
                                <input type="tel" name="emergencyContactPhone" value={form.emergencyContactPhone} onChange={handleChange} required />
                            </label>
                        </div>

                        <h3 className="formSectionHeading">Opportunity Details</h3>
                        <div className="formRow">
                            <label className="formField">
                                <span>Opportunity Name: <em>*</em></span>
                                <select name="opportunityId" value={form.opportunityId} onChange={handleChange} required>
                                    <option value="" disabled>Select a volunteer opportunity</option>
                                    {opportunities.map((opp) => (
                                        <option key={opp.id} value={opp.id}>{opp.title}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="formField">
                                <span>Chosen Shift: <em>*</em></span>
                                <select name="shiftId" value={form.shiftId} onChange={handleChange} required>
                                    <option value="" disabled>Select a shift</option>
                                    {shifts.map((shift) => (
                                        <option key={shift.id} value={shift.id}>{shift.label}</option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <h3 className="formSectionHeading">Skills and Interests</h3>
                        <div className="formRow">
                            <label className="formField">
                                <span>Relevant Skills</span>
                                <textarea
                                    rows="4"
                                    name="skills"
                                    placeholder="e.g. veterinary experience, photography, carpentry..."
                                    value={form.skills}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="formField">
                                <span>Why do you want to volunteer?</span>
                                <textarea
                                    rows="4"
                                    name="motivation"
                                    placeholder="Tell us a little about your motivation and connection to animals..."
                                    value={form.motivation}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        <label className="consentBox">
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                required
                            />
                            <span>
                                I agree to FORA's <Link to="/terms">volunteer terms</Link>, privacy policy, and consent to my information being used for volunteer coordination purposes. I understand that volunteering with animals carries inherent risks and that I will follow all FORA safety guidelines and staff safety advice.
                            </span>
                        </label>

                        {submitted ? (
                            <p className="formSuccess"><FiCheck aria-hidden="true" /> Thanks! Your application has been received.</p>
                        ) : (
                            <button type="submit" className="btn btnTeal formSubmit" disabled={!agreed || submitting}>
                                <FiCheck aria-hidden="true" /> {submitting ? "Submitting..." : "Submit Form"}
                            </button>
                        )}
                    </form>
                </section>
            </main>

            <Footer />

            {submitted && <ThankYouModal onClose={() => setSubmitted(false)} />}
        </div>
    );
}