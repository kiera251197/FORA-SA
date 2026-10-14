const raw = process.env.REACT_APP_API_URL || "https://fora-backend-h8fkd4gwe9fbepg5.southafricanorth-01.azurewebsites.net";

export const API_BASE_URL = raw.replace(/\/$/, "");
export default API_BASE_URL;