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
                obsidian: {
                    bg: '#000000',        // Pure Black
                    card: '#0A0A0A',      // Subtle Depth
                    surface: '#121212',   // Readable Surface
                },
                sage: {
                    DEFAULT: '#A7D7C5',   // Primary Sage
                    dim: '#74B796',       // Muted Sage
                    glow: 'rgba(167, 215, 197, 0.15)',
                },
                alert: {
                    pink: '#F4A4A4',      // Soft Warning
                    red: '#FF2E63',       // Critical
                },
                // Mapping legacy 'organic' names to new Obsidian theme for compatibility
                organic: {
                    dark: '#000000',      // Was #050505
                    gray: '#0A0A0A',      // Was #121212
                    green: '#A7D7C5',     // Was #00C853 (Now Sage)
                    beige: '#E0E0E0',     // Was #F0E6D2 (Now Off-white)
                    pink: '#F4A4A4',      // Was #FF2E63 (Now Soft Pink)
                    cream: '#FAFAFA',
                    border: '#333333',
                },
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
