import { FiX, FiHeart } from "react-icons/fi";
import "./thankYouModal.css";

export default function ThankYouModal({ onClose }) {
    return (
        <div className="modalOverlay" role="dialog" aria-modal="true" aria-labelledby="thankYouTitle">
            <div className="modalCard">
                <button type="button" className="modalClose" onClick={onClose} aria-label="Close">
                    <FiX aria-hidden="true" />
                </button>

                <span className="modalIcon"><FiHeart aria-hidden="true" /></span>

                <h2 id="thankYouTitle" className="modalTitle">Thank You For Your Support!</h2>

                <p className="modalText">
                    FORA has been notified that you're willing to help! Please keep an eye on your email and our team will be in touch with you shortly to confirm the details of your activity.
                </p>
            </div>
        </div>
    );
}