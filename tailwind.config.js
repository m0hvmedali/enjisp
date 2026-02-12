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
                organic: {
                    dark: '#050505',      // Deepest Black
                    gray: '#121212',      // Surface Black
                    green: '#00C853',     // Success/Growth Green
                    beige: '#F0E6D2',     // Primary Text/Border
                    pink: '#FF2E63',      // Accent/Alert Pink
                    cream: '#FFF9E6',     // Highlight
                },
                // Maintaining these for backward compatibility during refactor, but mapping to organic
                dark: {
                    bg: '#050505',
                    card: '#121212',
                    border: '#F0E6D2',
                },
                cine: {
                    dark: '#050505',
                    card: '#121212',
                    accent: '#00C853',
                    pink: '#FF2E63',
                    red: '#FF2E63',
                    blue: '#00C853',
                }
            },
            fontFamily: {
                arabic: ['Almarai', 'Tajawal', 'sans-serif'],
                english: ['Outfit', 'sans-serif'],
            },
            backgroundImage: {
                'organic-gradient': 'linear-gradient(to bottom right, #050505, #121212)',
                'green-glow': 'radial-gradient(circle at center, rgba(0, 200, 83, 0.15) 0%, transparent 70%)',
                'cosmic-mesh': 'none', // Removing the cosmic mesh
                'cosmic-gradient': 'none',
            },
            animation: {
                'float': 'float 8s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                'fade-in': 'fadeIn 0.5s ease-out',
                'mesh': 'none', // Disable mesh animation
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                }
            },
        },
    },
    plugins: [],
}
