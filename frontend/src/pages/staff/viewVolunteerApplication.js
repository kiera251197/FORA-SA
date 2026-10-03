import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import StaffNavbar from "../../components/staffNavbar";
import StaffFooter from "../../components/staffFooter";
import { getStaffName, clearStaffSession, staffFetch } from "../../utils/staffAuth";
import "./staff.css";

export default function ViewVolunteerApplication() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        staffFetch(`/api/volunteers/${id}`)
            .then((res) => (res.ok ? res.json() : Promise.reject()))
            .then((data) => setApplication(data))
            .catch(() => setApplication(null))
            .finally(() => setLoading(false));
    }, [id]);

    return (
        <div className="staffPage">
            <StaffNavbar staffName={getStaffName()} onLogout={() => { clearStaffSession(); navigate("/staff/login"); }} />

            <main className="container staffMain">
                <p className="staffSubHeading">FORA STAFF</p>
                <h1>Submitted Volunteer Form</h1>

                {loading ? (
                    <p className="staffListEmpty">Loading application...</p>
                ) : !application ? (
                    <p className="staffListEmpty">This application couldn't be found.</p>
                ) : (
                    <section className="staffFormCard">
                        <h2 className="staffFormApplicantName">
                            {application.first_name} {application.last_name}
                        </h2>

                        <h3 className="staffFormSectionHeading">Personal Information</h3>
                        <div className="staffFormRow">
                            <div className="staffFormField">
                                <span>Name: <em>*</em></span>
                                <div className="staffFormValue">{application.first_name}</div>
                            </div>
                            <div className="staffFormField">
                                <span>Surname: <em>*</em></span>
                                <div className="staffFormValue">{application.last_name}</div>
                            </div>
                        </div>
                        <div className="staffFormRow">
                            <div className="staffFormField">
                                <span>Email Address: <em>*</em></span>
                                <div className="staffFormValue">{application.email}</div>
                            </div>
                            <div className="staffFormField">
                                <span>Phone Number: <em>*</em></span>
                                <div className="staffFormValue">{application.phone}</div>
                            </div>
                        </div>

                        <h3 className="staffFormSectionHeading">Emergency Contact</h3>
                        <div className="staffFormRow">
                            <div className="staffFormField">
                                <span>Contact Name: <em>*</em></span>
                                <div className="staffFormValue">{application.emergency_contact_name}</div>
                            </div>
                            <div className="staffFormField">
                                <span>Contact Phone: <em>*</em></span>
                                <div className="staffFormValue">{application.emergency_contact_phone}</div>
                            </div>
                        </div>

                        <h3 className="staffFormSectionHeading">Opportunity Details</h3>
                        <div className="staffFormRow">
                            <div className="staffFormField">
                                <span>Opportunity Name: <em>*</em></span>
                                <div className="staffFormValue">{application.opportunity_title || "—"}</div>
                            </div>
                            <div className="staffFormField">
                                <span>Chosen Shift: <em>*</em></span>
                                <div className="staffFormValue">{application.shift_label || "—"}</div>
                            </div>
                        </div>

                        <h3 className="staffFormSectionHeading">Skills and Interests</h3>
                        <div className="staffFormRow">
                            <div className="staffFormField">
                                <span>Relevant Skills</span>
                                <div className="staffFormValue staffFormValue--block">
                                    {application.skills || "Not provided"}
                                </div>
                            </div>
                            <div className="staffFormField">
                                <span>Why do you want to volunteer?</span>
                                <div className="staffFormValue staffFormValue--block">
                                    {application.motivation || "Not provided"}
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="btn btnTeal staffFormFinishBtn"
                            onClick={() => navigate("/staff/volunteerApplications")}
                        >
                            <FiCheckCircle aria-hidden="true" /> Finish Reviewing Form
                        </button>
                    </section>
                )}
            </main>

            <StaffFooter />
        </div>
    );
}