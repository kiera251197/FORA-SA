import { Navigate } from "react-router-dom";
import { isStaffAuthenticated } from "../utils/staffAuth";

export default function RequireStaffAuth({ children }) {
    if (!isStaffAuthenticated()) {
        return <Navigate to="/staff/login" replace />;
    }
    return children;
}