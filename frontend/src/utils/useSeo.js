import { useEffect } from "react";

const SITE_URL = (process.env.REACT_APP_SITE_URL || "https://www.forasaconnect.co.za").replace(/\/$/, "");

function upsertMeta(attr, key, content) {
    if (!content) return;
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
        const blockIndexing = noindex || process.env.REACT_APP_NOINDEX === "true";

        const fullTitle = title
            ? `${title} | FORA Connect`
            : "FORA Connect | Friends of Rescued Animals SA";
            
        const defaultDesc = description || "Support and volunteer with Friends of Rescued Animals SA.";
        const url = SITE_URL + window.location.pathname;

        // Title & Description
        document.title = fullTitle;
        upsertMeta("name", "description", defaultDesc);

        // Open Graph Meta Tags
        upsertMeta("property", "og:title", fullTitle);
        upsertMeta("property", "og:description", defaultDesc);
        upsertMeta("property", "og:url", url);

        // Robots indexing
        upsertMeta("name", "robots", blockIndexing ? "noindex, nofollow" : "index, follow");

        // Canonical URL Link Tag
        let canonical = document.head.querySelector('link[rel="canonical"]');
        if (blockIndexing) {
            if (canonical) canonical.remove();
        } else {
            if (!canonical) {
                canonical = document.createElement("link");
                canonical.setAttribute("rel", "canonical");
                document.head.appendChild(canonical);
            }
            canonical.setAttribute("href", url);
        }
    }, [title, description, noindex]);
}