import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiSlash, FiUploadCloud } from "react-icons/fi";
import StaffNavbar from "../../components/staffNavbar";
import StaffFooter from "../../components/staffFooter";
import LabelPicker from "../../components/labelPicker";
import "../staff/staff.css";

export default function AddOpportunity() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [hours, setHours] = useState("");
    const [labels, setLabels] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [saving, setSaving] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setPreview(file ? URL.createObjectURL(file) : null);
    };

    const handleSubmit = async () => {
        setSaving(true);
        const data = new FormData();
        data.append("title", title);
        data.append("location", location);
        data.append("hours", hours);
        data.append("tags", labels.join(","));
        if (imageFile) data.append("image", imageFile);

        try {
            const res = await fetch("/api/opportunities", { method: "POST", body: data });
            if (!res.ok) throw new Error("Failed to post");
            navigate("/staff/dashboard");
        } catch (err) {
            console.error("Failed to post opportunity:", err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="staffPage">
            <StaffNavbar staffName="Linda" onLogout={() => navigate("/staff/login")} />

            <main className="container staffMain">
                <p className="staffEyebrow">FORA STAFF</p>
                <h1>Add Opportunity</h1>

                <section className="staffCard">
                    <div className="staffCardHead">
                        <button type="button" className="btn btnTeal" onClick={handleSubmit} disabled={saving}>
                            <FiPlus aria-hidden="true" /> {saving ? "Posting..." : "Post Opportunity"}
                        </button>
                    </div>

                    <label className="staffField">
                        <span>Heading / Title:</span>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </label>

                    <div className="staffFieldRow">
                        <label className="staffField">
                            <span>Location:</span>
                            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                        </label>
                        <label className="staffField">
                            <span>Time Per Session (hrs):</span>
                            <input type="number" min="0" value={hours} onChange={(e) => setHours(e.target.value)} />
                        </label>
                    </div>

                    <div className="staffField">
                        <span>Promotional Image:</span>
                        <label className="uploadBox">
                            <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                            {preview ? (
                                <img className="uploadPreview" src={preview} alt="" />
                            ) : (
                                <span className="uploadPrompt">
                                    <FiUploadCloud aria-hidden="true" />
                                    Click to Upload
                                </span>
                            )}
                        </label>
                    </div>

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