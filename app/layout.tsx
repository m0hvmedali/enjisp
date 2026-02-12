import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Tajawal, Outfit } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const tajawal = Tajawal({
    weight: ['300', '400', '700', '900'],
    subsets: ['arabic'],
    variable: '--font-arabic'
})

const outfit = Outfit({
    weight: ['300', '400', '600', '800'],
    subsets: ['latin'],
    variable: '--font-english'
})

export const metadata: Metadata = {
    title: 'Enji Study Planner - خطة المذاكرة الذكية',
    description: 'نظام إدارة المذاكرة الاحترافي مع مراعاة الحالة النفسية',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ar" dir="rtl" className={`${tajawal.variable} ${outfit.variable}`}>
            <body className="bg-dark-bg text-white antialiased">
                <Toaster
                    position="top-center"
                    toastOptions={{
                        style: {
                            background: '#0f172a',
                            color: '#fff',
                            border: '1px solid rgba(255,255,255,0.1)',
                        },
                    }}
                />
                {children}
            </body>
        </html>
    )
}
