import { useEffect } from "react";

function upsertMeta(attr, key, content) {
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute("content", content);
}

export default function useSeo({ title, description, noindex = false }) {
    useEffect(() => {
        const fullTitle = title
            ? `${title} | FORA Connect`
            : "FORA Connect | Friends of Rescued Animals SA";
        const url = window.location.origin + window.location.pathname;

        document.title = fullTitle;
        upsertMeta("property", "og:title", fullTitle);
        upsertMeta("property", "og:url", url);
        upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

        if (description) {
            upsertMeta("name", "description", description);
            upsertMeta("property", "og:description", description);
        }

        let canonical = document.head.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement("link");
            canonical.setAttribute("rel", "canonical");
            document.head.appendChild(canonical);
        }
        canonical.setAttribute("href", url);
    }, [title, description, noindex]);
}