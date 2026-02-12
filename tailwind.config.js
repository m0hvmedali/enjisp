/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                border: "rgba(255, 255, 255, 0.1)",
                dark: {
                    bg: '#020617',
                    card: '#0f172a',
                    lighter: '#1e293b',
                },
                accent: {
                    blue: '#3b82f6',
                    purple: '#9333ea',
                    green: '#10b981',
                    gold: '#f59e0b',
                    pink: '#ec4899',
                }
            },
            fontFamily: {
                arabic: ['Tajawal', 'sans-serif'],
                english: ['Outfit', 'sans-serif'],
            },
            backgroundImage: {
                'radial-dark': 'radial-gradient(circle at 50% 50%, #1e293b 0%, #020617 100%)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.4s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(100%)' },
                    '100%': { transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
