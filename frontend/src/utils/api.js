const raw = process.env.REACT_APP_API_URL || "";

export const API_BASE_URL = raw.replace(/\/$/, "");
export default API_BASE_URL;