import { FiEye, FiCompass, FiTarget, FiHeart } from "react-icons/fi";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import heroDesktop from "../assets/images/heroStoryDesktop.svg";
import heroTablet from "../assets/images/heroStoryTablet.svg";
import heroMobile from "../assets/images/heroStoryMobile.svg";
import "../pages/story.css";

const pillars = [
  {
    icon: FiEye,
    title: "Our Vission",
    text: "FORA exists to rescue, protect, and improve the lives of abandoned, abused, and neglected animals while promoting responsible pet ownership through compassion, community involvement, and education.",
  },
  {
    icon: FiCompass,
    title: "Our Mission",
    text: "FORA achieves this by providing rescue, rehabilitation, shelter, adoption services, community education, fundraising initiatives, and volunteer opportunities, relying on the support of dedicated staff, volunteers, and donors.",
  },
  {
    icon: FiTarget,
    title: "Our Objective",
    text: "FORA's main objective is to rescue, rehabilitate and responsibly rehome animals that have been abandoned, neglected or are in need of care. The organisation aims to provide animals with a safe environment while suitable permanent homes are found. FORA also promotes responsible pet ownership, including proper care, sterilisation and ensuring that potential adopters are prepared for the long-term responsibility of owning an animal.",
  },
  {
    icon: FiHeart,
    title: "Our Values",
    text: "FORA's work reflects values of compassion, responsibility, animal welfare, commitment, community and respect. The organisation prioritises the wellbeing of animals and aims to ensure that adoption decisions are made in their best interests. FORA also values community involvement, encouraging people to contribute through adoption, volunteering, donations and other forms of support.",
  },
];

export default function Story() {
  return (
    <div className="story">
      <header className="hero storyHero">
        <Navbar />
        <picture>
            <source media="(min-width: 1024px)" srcSet={heroDesktop} />
            <source media="(min-width: 834px)" srcSet={heroTablet} />
            <img className="heroImg" src={heroMobile} alt="A golden retriever leaping across a green meadow" />
        </picture>
      </header>

      <main className="container">
        <section className="section storyIntro">
            <h2>Our Story</h2>
            <p>
                Friends of Rescued Animals (FORA SA) is a local non-profit organisation dedicated to rescuing, rehabilitating, and rehoming abandoned and neglected dogs and cats. Through the support of volunteers, donations, and community involvement, FORA gives vulnerable animals a second chance at finding safe, loving homes.
            </p>
        </section>

        <section className="section pillarsGrid" aria-label="Our vision, mission, objective and values">
          {pillars.map(({ icon: Icon, title, text }) => (
            <article key={title} className="pillarCard">
              <span className="pillarCardIcon"><Icon aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}