'use client'

import { ReactNode } from 'react'
import '@/styles/layout.scss'
import Navbar from '@/components/layouts/Navber'

export const MasterLayout = ({ children }: { children: ReactNode }) => {
    return (
        // Added min-h-screen to stretch the container fully and look balanced
        <div className="w-full lg:w-4/5 lg:max-w-[1200px] mx-auto min-h-screen flex flex-col justify-between">

            {/* REMOVED mt-2 lg:mt-4 so the layout hits the top wall */}
            <header className="w-full">
                <Navbar />
            </header>

            {/* Main Content Area */}
            <main className="w-full flex-grow px-6 py-6 lg:py-8">
                {children}
            </main>

            {/* Footer Layer */}
            <footer className="w-full border-t border-slate-200 py-4 text-center text-sm text-slate-500">
                © {new Date().getFullYear()} V-Fresh. All rights reserved.
            </footer>
        </div>
    )
}
