import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiSlash } from "react-icons/fi";
import StaffNavbar from "../../components/staffNavbar";
import StaffFooter from "../../components/staffFooter";
import LabelPicker from "../../components/labelPicker";
import "../staff/staff.css";

export default function AddAnnouncement() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [labels, setLabels] = useState([]);
    const [saving, setSaving] = useState(false);

    const handleSubmit = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/announcements", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description, labels: labels.join(",") }),
            });
            if (!res.ok) throw new Error("Failed to post");
            navigate("/staff/dashboard");
        } catch (err) {
            console.error("Failed to post announcement:", err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="staffPage">
            <StaffNavbar staffName="Linda" onLogout={() => navigate("/staff/login")} />

            <main className="container staffMain">
                <p className="staffEyebrow">FORA STAFF</p>
                <h1>Add Announcement</h1>

                <section className="staffCard">
                    <div className="staffCardHead">
                        <button type="button" className="btn btnTeal" onClick={handleSubmit} disabled={saving}>
                            <FiPlus aria-hidden="true" /> {saving ? "Posting..." : "Post Announcement"}
                        </button>
                    </div>

                    <label className="staffField">
                        <span>Heading / Title:</span>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </label>

                    <label className="staffField">
                        <span>Description:</span>
                        <textarea rows="5" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </label>

                    <LabelPicker selected={labels} onChange={setLabels} />

                    <div className="staffCardActions">
                        <button type="button" className="btn btnOutline" onClick={() => navigate("/staff/dashboard")}>
                            <FiSlash aria-hidden="true" /> Cancel
                        </button>
                    </div>
                </section>
            </main>

            <StaffFooter />
        </div>
    );
}