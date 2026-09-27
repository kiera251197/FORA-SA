import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { setStaffSession } from "../../utils/staffAuth";
import "./login.css";


export default function StaffLogin() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            const res = await fetch("/api/staff/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                setError("Incorrect username or password.");
                return;
            }

            const { token, staffName } = await res.json();
            setStaffSession(token, staffName);
            navigate("/staff/dashboard");
        } catch (err) {
            console.error("Login failed:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="staffLoginPage">
            <Navbar />

            <main className="container">
                <section className="staffLoginIntro">
                    <p className="staffSubHeading">FORA STAFF</p>
                    <h1>Administration</h1>
                    <p>Please sign in to edit, add or remove items from the FORA dashboard.</p>
                </section>

                <section className="loginCard">
                    <div className="loginArt" aria-hidden="true" />

                    <form className="loginFormPanel" onSubmit={handleSubmit}>
                        <label className="staffField">
                            <span>Username:</span>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="username"
                                required
                            />
                        </label>

                        <label className="staffField">
                            <span>Password:</span>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                            />
                        </label>

                        {error && <p className="loginError" role="alert">{error}</p>}

                        <button type="submit" className="btn btnTeal loginSubmit" disabled={submitting}>
                            <FiLogIn aria-hidden="true" /> {submitting ? "Signing In..." : "Sign In"}
                        </button>

                        <a className="loginForgot" href="/">Forgot password?</a>
                    </form>
                </section>
            </main>

            <Footer />
        </div>
    );
}