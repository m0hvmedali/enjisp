import '@/styles/globals.css'
import type { Metadata, Viewport } from 'next'
import { Tajawal, Outfit } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import EntryGate from '@/components/EntryGate';
import BottomNav from '@/components/BottomNav';

const tajawal = Tajawal({
    weight: ['300', '400', '700', '900'],
    subsets: ['arabic'],
    variable: '--font-arabic',
    display: 'swap',
})

const outfit = Outfit({
    weight: ['300', '400', '600', '800'],
    subsets: ['latin'],
    variable: '--font-english',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'ENJI Study | نظام إدارة المذاكرة الاحترافي',
    description: 'منصة تعليمية متكاملة مصممة خصيصاً لمساعدة الطلاب على تنظيم دراسة المواد العلمية (كيمياء، فيزياء، رياضيات) واللغة العربية والإنجليزية بأسلوب احترافي وعصري.',
    appleWebApp: {
        title: 'ENJI Study',
        statusBarStyle: 'black-translucent',
    },
}

export const viewport: Viewport = {
    themeColor: '#050505',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ar" dir="rtl" className={`${tajawal.variable} ${outfit.variable}`}>
            <body className="bg-organic-dark text-white antialiased overflow-x-hidden selection:bg-organic-green/30 selection:text-white pb-24 md:pb-0">
                <Toaster
                    position="bottom-left"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: 'rgba(18, 18, 18, 0.9)',
                            color: '#F0E6D2',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '20px',
                            padding: '16px 24px',
                            fontSize: '14px',
                            fontFamily: 'var(--font-arabic)',
                        },
                    }}
                />
                <EntryGate />
                <main className="min-h-screen relative z-0">
                    {children}
                </main>
                <BottomNav />
            </body>
        </html>
    )
}
