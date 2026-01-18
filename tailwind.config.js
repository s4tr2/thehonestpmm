/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border) / <alpha-value>)",
                background: "hsl(var(--background) / <alpha-value>)",
                foreground: "hsl(var(--foreground) / <alpha-value>)",
                primary: {
                    DEFAULT: "hsl(var(--primary) / <alpha-value>)",
                    foreground: "#ffffff",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent) / <alpha-value>)",
                    foreground: "#ffffff",
                },
            },
            fontFamily: {
                body: ["Inter", "sans-serif"],
                display: ["Plus Jakarta Sans", "sans-serif"],
                heading: ["Plus Jakarta Sans", "sans-serif"],
            },
        },
    },
    plugins: [],
}
