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
                    border: 'rgba(255, 255, 255, 0.08)',
                },
                google: {
                    blue: '#4285F4',
                    red: '#EA4335',
                    yellow: '#FBBC05',
                    green: '#34A853',
                },
                accent: {
                    blue: '#3b82f6',
                    purple: '#9333ea',
                    green: '#10b981',
                    gold: '#f59e0b',
                    pink: '#ec4899',
                    indigo: '#6366f1',
                }
            },
            fontFamily: {
                arabic: ['Almarai', 'Tajawal', 'sans-serif'],
                english: ['Outfit', 'sans-serif'],
            },
            backgroundImage: {
                'radial-dark': 'radial-gradient(circle at 50% 50%, #1e293b 0%, #020617 100%)',
                'cosmic-gradient': 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.15), transparent), radial-gradient(circle at bottom left, rgba(168, 85, 247, 0.15), transparent)',
                'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
                'cosmic-mesh': 'linear-gradient(45deg, #020617, #0f172a, #1e293b, #020617)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.4s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
                'pulse-glow': 'pulseGlow 2s infinite',
                'float': 'float 3s ease-in-out infinite',
                'mesh': 'mesh 15s ease infinite',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                mesh: {
                    '0%, 100%': { backgroundPosition: '0% 50%', backgroundSize: '200% 200%' },
                    '50%': { backgroundPosition: '100% 50%', backgroundSize: '200% 200%' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
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
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)' },
                    '50%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.4)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            },
        },
    },
    plugins: [],
}
