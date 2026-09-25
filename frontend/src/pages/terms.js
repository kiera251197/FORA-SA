import Navbar from "../components/navbar";
import Footer from "../components/footer";
import heroDesktop from "../assets/images/heroTermsDesktop.png";
import heroTablet from "../assets/images/heroTermsTablet.png";
import heroMobile from "../assets/images/heroTermsMobile.png";
import "./terms.css";

const termsCards = [
  {
    title: "Where To Start?",
    body: (
      <>
        <p>
            Visit FORA anytime during our <em><strong>working hours</strong></em> (Monday - Friday 09:00 - 16:00, Saturday 09:00 - 14:00 and Sunday 09:00 - 12:00) and fill out an indemnity form
        </p>

        <p className="termsOr">OR</p>

        <p>
            Fill out our volunteer form <em><strong>online</strong></em> to book your volunteer slot, and fill out the indemnity form on the day upon arrival.
        </p>
      </>
    ),
  },
  {
    title: "Fees Involved?",
    body: (
      <>
        <p>
            We charge a once off admin fee of R100.00 or a donation of a dog/cat food to cover the costs of intake and orientation.
        </p>
        <p>
            If your hours need to be tracked, we have forms available to sign on our end or you can bring your own.
        </p>
      </>
    ),
  },
  {
    title: "How Old Do I Have To Be?",
    body: (
      <>
        <p>
            If the volunteer is <em><strong>under 18 years</strong></em> old the form needs to be completed by a parent or guardian.
        </p>
        <p>
            Anyone <em><strong>under 16 years</strong></em> or younger needs to be accompanied by an adult during their time at FORA (non-negotiable).
        </p>
      </>
    ),
  },
];

export default function Terms() {
  return (
    <div className="terms">
      <header className="hero termsHero">
        <Navbar />
        <picture>
            <source media="(min-width: 1024px)" srcSet={heroDesktop} />
            <source media="(min-width: 834px)" srcSet={heroTablet} />
            <img className="heroImg" src={heroMobile} alt="" />
        </picture>
      </header>

        <main className="container">
            <section className="section termsIntro">
                <h1>Volunteer Terms</h1>
                <p>
                    Thank you for enquiring about volunteering with our organisation. The process is as follows:
                </p>
            </section>

            <section className="section termsGrid" aria-label="Volunteer terms and conditions">
            {termsCards.map(({ title, body }) => (
                <article key={title} className="termsCard">
                <h2>{title}</h2>
                {body}
                </article>
            ))}
            </section>
        </main>

        <Footer />
    </div>
  );
}