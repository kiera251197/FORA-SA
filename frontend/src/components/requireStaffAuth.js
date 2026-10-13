import { Navigate } from "react-router-dom";
import { isStaffAuthenticated } from "../utils/staffAuth";
import useSeo from "../utils/useSeo";

export default function RequireStaffAuth({ children }) {
     useSeo({
        title: "Staff",
        noindex: true,
    });

    if (!isStaffAuthenticated()) {
        return <Navigate to="/staff/login" replace />;
    }
    return children;
}