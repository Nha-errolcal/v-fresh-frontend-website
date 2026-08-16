'use client'

import { ReactNode, useState, useEffect } from 'react'
import '@/styles/layout.scss'
import Navbar from '@/components/layouts/Navber'
import { ChevronUp } from 'lucide-react'

interface LayoutProps {
    children: ReactNode;
}

export const MasterLayout = ({ children }: { children: ReactNode }) => {
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const restaurantSchema = {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": "V-Fresh Restaurant Cambodia",
        "image": "/assets/logo.png",
        "description": "Premium authentic food and fresh cuisines available online across Cambodia.",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Siem Reap",
            "addressCountry": "KH"
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            "opens": "08:00",
            "closes": "22:00"
        },
        "menu": "https://vfresh-menu.com",
        "servesCuisine": "Cambodian, Asian Fresh Food"
    };

    return (
        <div className="w-full min-h-screen flex flex-col bg-[#FAF8F5] selection:bg-[#7A2434]/10 selection:text-[#7A2434]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
            />

            <Navbar />

            <main className="w-full flex-grow pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                {children}
            </main>

            <button
                type="button"
                onClick={goToTop}
                aria-label="Scroll to top"
                className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-xl 
                    bg-gradient-to-br from-[#7A2434] to-[#5C1B26] text-[#F3E3B8] 
                    shadow-[0_4px_14px_rgba(122,36,52,0.3)] border border-[#C8A04D]/30
                    hover:brightness-110 active:scale-95 transition-all duration-300
                    ${showTopBtn ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible'}`}
            >
                <ChevronUp className="w-6 h-6 stroke-[2.5]" />
            </button>

            <footer className="w-full border-t border-[#E5D6AE]/40 bg-white py-6 text-center text-xs font-bold text-slate-400 tracking-wide">
                <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-slate-500">
                        © {new Date().getFullYear()} <span className="text-[#7A2434] font-extrabold">V-Fresh</span>. រក្សាសិទ្ធិគ្រប់យ៉ាងដោយ លោកអ្នក។
                    </p>
                    <p className="text-[10px] uppercase tracking-widest text-[#A8895A]">
                        Powered with precision & cultural pride.
                    </p>
                </div>
            </footer>
        </div>
    )
}