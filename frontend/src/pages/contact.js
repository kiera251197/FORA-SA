import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import heroDesktop from "../assets/images/heroContactDesktop.png";
import heroTablet from "../assets/images/heroContactTablet.png";
import heroMobile from "../assets/images/heroContactMobile.png";
import "./contact.css";

const contactDetails = [
    {
        icon: FiMail,
        label: "Email Address",
        text: "info@forasa.co.za",
        href: "mailto:info@forasa.co.za",
    },
    {
        icon: FiPhone,
        label: "Phone Number - Linda",
        text: "+27 (082) 336 5568",
        href: "tel:+27823365568",
    },
    {
        icon: FiMapPin,
        label: "Our Location",
        text: "PTN 11, Reydal, Tarlton, Gauteng. Wolfelea AH",
    },
];

const noteItems = [
    <><strong>ALL</strong> existing dogs and cats at home must be sterilized (unless there is a valid medical reason for non-sterilization certified by a vet, please bring us a letter signed by your vet).</>,
    <>Home checks apply for dogs (unless a reputable org/SPCA has completed a check at your home recently and given the 'all clear').</>,
    <>We will not allow an adoption to go through as a security dogs - dogs are to be part of the family and sleep inside.</>,
    <>If you have never raised or taken care of a puppy and are not willing to put the time, effort and costs for training, toys, proper food, etc. then we suggest looking at an adult dog instead.</>,
    <>If you are not willing to give your dog or cat the care it needs, (you did not realize how expensive, tiring or consuming it can be), might we recommend that a plushie would be the better option.</>,
];

const feeItems = [
    <>Adoption fee for dogs/puppies = <strong>R1200</strong>. This includes vaccinations up to date, de-worming, microchip, parasite control, viral testing and sterilization.</>,
    <>Adoption fee for cats/kittens = <strong>R1000</strong>. This includes vaccinations up to date, de-worming, parasite control, viral testing for FIV and FeLV, microchip and sterilization. Please bring a secure cat carrier as we do not allow cats to travel loose in a car.</>,
];

export default function Contact() {
    return (
        <div className="contact">
            <header className="hero contactHero">
                <Navbar />
                <picture>
                    <source media="(min-width: 1024px)" srcSet={heroDesktop} />
                    <source media="(min-width: 834px)" srcSet={heroTablet} />
                    <img className="heroImg" src={heroMobile} alt="" />
                </picture>
            </header>

            <main className="container">
                <section className="section contactIntro">
                    <h1>Get in Touch</h1>
                    <p>We are here and happy to answer any questions.</p>
                </section>

                <section className="section contactCards" aria-label="Contact details">
                    {contactDetails.map(({ icon: Icon, label, text, href }) => (
                        <article key={label} className="contactCard">
                            <span className="contactCardIcon"><Icon aria-hidden="true" /></span>
                            <div>
                                <span className="contactCardLabel">{label}</span>
                                {href ? (
                                    <a className="contactCardValue" href={href}>{text}</a>
                                ) : (
                                    <p className="contactCardValue">{text}</p>
                                )}
                            </div>
                        </article>
                    ))}
                </section>

                <section className="section procedures">
                    <h2>Adoption Procedures</h2>
                    <p className="proceduresSub">The more you know.</p>

                    <h3>Please Take Note:</h3>
                    <ul className="proceduresList">
                        {noteItems.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>

                    <h3>Fees:</h3>
                    <ul className="proceduresList">
                        {feeItems.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </section>
            </main>

            <Footer />
        </div>
    );
}