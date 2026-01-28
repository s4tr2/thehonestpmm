import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import posthog from "posthog-js";

// Initialize PostHog
// Replace with your Project API Key and Host
posthog.init('phc_3MDcgnyEd0OYkAinsOEn0bgOuGZdD5jl074GM3FAJf4', {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only', 
    loaded: (posthog) => {
        if (import.meta.env.DEV) posthog.debug();
    }
});

createRoot(document.getElementById("root")!).render(<App />);
