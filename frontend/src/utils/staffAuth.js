import { API_BASE_URL } from "./api";

const TOKEN_KEY = "fora_staff_token";
const NAME_KEY = "fora_staff_name";

export function setStaffSession(token, staffName) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(NAME_KEY, staffName);
}

export function clearStaffSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(NAME_KEY);
}

export function getStaffToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function getStaffName() {
    return localStorage.getItem(NAME_KEY) || "Staff";
}

export function isStaffAuthenticated() {
    return Boolean(getStaffToken());
}

export function staffFetch(path, options = {}) {
    const token = getStaffToken();
    const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
    return fetch(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: token ? `Bearer ${token}` : "",
        },
    });
}