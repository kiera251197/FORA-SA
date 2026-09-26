import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiSave, FiSlash, FiTrash2 } from "react-icons/fi";
import StaffNavbar from "../../components/staffNavbar";
import StaffFooter from "../../components/staffFooter";
import LabelPicker from "../../components/labelPicker";
import "../staff/staff.css";

export default function EditAnnouncement() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [labels, setLabels] = useState([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch(`/api/announcements/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setTitle(data.title);
                setDescription(data.description);
                setLabels(data.labels || []);
            })
            .catch((err) => console.error("Failed to load announcement:", err));
    }, [id]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch(`/api/announcements/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description, labels: labels.join(",") }),
            });
            if (!res.ok) throw new Error("Failed to save");
            navigate("/staff/dashboard");
        } catch (err) {
            console.error("Failed to save announcement:", err);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Delete this announcement? This can't be undone.")) return;
        try {
            const res = await fetch(`/api/announcements/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete");
            navigate("/staff/dashboard");
        } catch (err) {
            console.error("Failed to delete announcement:", err);
        }
    };

    return (
        <div className="staffPage">
            <StaffNavbar staffName="Linda" onLogout={() => navigate("/staff/login")} />

            <main className="container staffMain">
                <p className="staffEyebrow">FORA STAFF</p>
                <h1>Edit Announcement</h1>

                <section className="staffCard">
                    <div className="staffCardHead">
                        <button type="button" className="btn btnTeal" onClick={handleSave} disabled={saving}>
                            <FiSave aria-hidden="true" /> {saving ? "Saving..." : "Save Changes"}
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
                        <button type="button" className="btn btnIndigoSolid" onClick={handleDelete}>
                            <FiTrash2 aria-hidden="true" /> Delete
                        </button>
                    </div>
                </section>
            </main>

            <StaffFooter />
        </div>
    );
}