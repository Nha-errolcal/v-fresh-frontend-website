'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { MapPin } from "lucide-react";
import bgHeader from "@/assets/bg_nav.jpg";
import "flag-icons/css/flag-icons.min.css";
import CountryFlag from "../CountryFlag";
import { useTranslation } from "@/hooks/useTranslation";
import { FaFacebook, FaTelegram } from "react-icons/fa";
import { useFetchFood } from "@/stores/useFetchFood";

const Navbar = () => {
    const { locale, setLocale } = useTranslation("Navbar");
    const categoryFood = useFetchFood((state) => state.categoryFood);
    const isLoading = useFetchFood((state) => state.isLoading);
    const listItemCategoryProduct = useFetchFood((state) => state.listItemCategoryProduct);
    const [currentHash, setCurrentHash] = useState<string>("");

    useEffect(() => {
        listItemCategoryProduct();
    }, [listItemCategoryProduct]);

    useEffect(() => {
        const handleHashChange = () => setCurrentHash(window.location.hash);
        handleHashChange();
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    const toggleLanguage = () => setLocale(locale === "kh" ? "en" : "kh");

    const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, targetHref: string, categoryId: number) => {
        e.preventDefault();
        window.history.pushState(null, "", targetHref);
        window.dispatchEvent(new HashChangeEvent("hashchange"));

        const targetElement = document.getElementById(`menu-food-section-${categoryId}`);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div className="w-full bg-slate-50/50">
            {/* Minimalist Visual Banner */}
            <header
                className="w-full flex items-center justify-between px-4 sm:px-8 py-4 border-b border-slate-100 bg-cover bg-center relative min-h-[90px]"
                style={{ backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.95), rgba(255,255,255,0.8)), url(${bgHeader.src})` }}
            >
                <div className="flex items-center gap-4 sm:gap-6">
                    <Image src={logo} width={50} height={50} alt="V-Fresh Logo" className="object-contain drop-shadow" priority />
                    <div className="flex gap-2 border-l border-slate-200 pl-4 sm:pl-6">
                        <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-slate-600 hover:text-blue-600 bg-white shadow-sm border border-slate-100 transition-colors"><MapPin className="w-4 h-4" /></a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-slate-600 hover:text-[#1877F2] bg-white shadow-sm border border-slate-100 transition-colors"><FaFacebook className="w-4 h-4" /></a>
                        <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-slate-600 hover:text-[#26A5E4] bg-white shadow-sm border border-slate-100 transition-colors"><FaTelegram className="w-4 h-4" /></a>
                    </div>
                </div>

                <button onClick={toggleLanguage} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:border-slate-300 transition-all text-xs font-bold shadow-sm">
                    {locale === "kh" ? (
                        <><CountryFlag countryCode="kh" /> <span className="text-slate-800">ខ្មែរ</span></>
                    ) : (
                        <><CountryFlag countryCode="gb" /> <span className="text-slate-800">EN</span></>
                    )}
                </button>
            </header>

            {/* Seamless, High-Fidelity Sticky Navigation Bars */}
            <nav className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-[0_4px_12px_-6px_rgba(0,0,0,0.03)] overflow-hidden">
                <div className="max-w-6xl mx-auto px-4">
                    <ul className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar py-3.5 mask-image-linear">
                        {!isLoading && categoryFood.map((cat) => {
                            const URLFriendlyName = encodeURIComponent(cat.name.replace(/\s+/g, "-"));
                            const targetHref = `#menu-food=${URLFriendlyName}`;
                            const isActive = currentHash === targetHref;

                            return (
                                <li key={cat.id} className="relative flex-shrink-0">
                                    <a
                                        href={targetHref}
                                        onClick={(e) => handleTabClick(e, targetHref, cat.id)}
                                        className={`block text-sm font-bold tracking-tight pb-1 transition-all duration-200 relative
                                            ${isActive ? "text-blue-600 scale-[1.02]" : "text-slate-500 hover:text-slate-800"}`}
                                    >
                                        {cat.name}
                                        {isActive && (
                                            <span className="absolute bottom-[-14px] left-0 right-0 h-[3px] bg-blue-600 rounded-full animate-fade-in" />
                                        )}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;