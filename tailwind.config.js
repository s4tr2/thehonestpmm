/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0a0a0a',
                accent: {
                    DEFAULT: '#d4ff00',
                    pink: '#ff3366',
                    orange: '#ff6b35',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Space Grotesk', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            },
        },
    },
    plugins: [],
}
