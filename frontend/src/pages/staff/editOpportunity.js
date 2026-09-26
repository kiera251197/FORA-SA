import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiSave, FiSlash, FiTrash2, FiUploadCloud } from "react-icons/fi";
import StaffNavbar from "../../components/staffNavbar";
import StaffFooter from "../../components/staffFooter";
import LabelPicker from "../../components/labelPicker";
import "../staff/staff.css";

export default function EditOpportunity() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [hours, setHours] = useState("");
    const [labels, setLabels] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch(`/api/opportunities/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setTitle(data.title);
                setLocation(data.location);
                setHours(data.hours);
                setLabels(data.tags || []);
                setPreview(data.image);
            })
            .catch((err) => console.error("Failed to load opportunity:", err));
    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    const handleSave = async () => {
        setSaving(true);
        const data = new FormData();
        data.append("title", title);
        data.append("location", location);
        data.append("hours", hours);
        data.append("tags", labels.join(","));
        if (imageFile) data.append("image", imageFile);

        try {
            const res = await fetch(`/api/opportunities/${id}`, { method: "PUT", body: data });
            if (!res.ok) throw new Error("Failed to save");
            navigate("/staff/dashboard");
        } catch (err) {
            console.error("Failed to save opportunity:", err);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Delete this opportunity? This can't be undone.")) return;
        try {
            const res = await fetch(`/api/opportunities/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete");
            navigate("/staff/dashboard");
        } catch (err) {
            console.error("Failed to delete opportunity:", err);
        }
    };

    return (
        <div className="staffPage">
            <StaffNavbar staffName="Linda" onLogout={() => navigate("/staff/login")} />

            <main className="container staffMain">
                <p className="staffEyebrow">FORA STAFF</p>
                <h1>Edit Opportunity</h1>

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