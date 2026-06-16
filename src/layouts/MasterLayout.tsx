'use client'

import { ReactNode } from 'react'
import '@/styles/layout.scss'
import Navbar from '@/components/layouts/Navber'

export const MasterLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full min-h-screen flex flex-col bg-slate-50/40 selection:bg-blue-100">
            <Navbar />

            <main className="w-full flex-grow pb-16">
                {children}
            </main>

            <footer className="w-full border-t border-slate-100 bg-white py-6 text-center text-xs font-medium text-slate-400">
                © {new Date().getFullYear()} V-Fresh. Powered with precision.
            </footer>
        </div>
    )
}