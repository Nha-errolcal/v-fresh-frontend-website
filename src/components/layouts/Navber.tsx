'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { MapPin, Globe } from "lucide-react";
import bgHeader from "@/assets/bg_nav.jpg";
import "flag-icons/css/flag-icons.min.css";
import CountryFlag from "../CountryFlag";
import { useTranslation } from "@/hooks/useTranslation";
import { FaFacebook, FaTelegram } from "react-icons/fa";
import { useFetchFood } from "@/stores/useFetchFood";

const Navbar = () => {
    const { tr, locale, setLocale } = useTranslation("Navbar");

    const categoryFood = useFetchFood((state) => state.categoryFood);
    const isLoading = useFetchFood((state) => state.isLoading);
    const listItemCategoryProduct = useFetchFood((state) => state.listItemCategoryProduct);
    const [currentHash, setCurrentHash] = useState<string>("");

    useEffect(() => {
        listItemCategoryProduct();
    }, [listItemCategoryProduct]);

    useEffect(() => {
        const handleHashChange = () => {
            setCurrentHash(window.location.hash || "");
        };
        handleHashChange();
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    const toggleLanguage = () => setLocale(locale === "kh" ? "en" : "kh");

    const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, targetHref: string, categoryId: number) => {
        e.preventDefault();
        window.history.pushState(null, "", targetHref);
        setCurrentHash(targetHref);

        const targetElement = document.getElementById(`menu-food-section-${categoryId}`);
        if (targetElement) {
            const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <>
            <header
                className="w-full flex items-center justify-between px-4 sm:px-8 py-3 bg-cover bg-center relative min-h-[85px] border-b border-[#E5D6AE]/30"
                style={{ backgroundImage: `linear-gradient(to right, rgba(254, 251, 246, 0.96), rgba(254, 251, 246, 0.88)), url(${bgHeader.src})` }}
            >
                <div className="flex items-center gap-4">
                    <Image
                        src={logo}
                        width={55}
                        height={55}
                        alt="V-Fresh Logo"
                        className="object-contain drop-shadow"
                        priority
                    />
                    <div className="flex gap-2.5 border-l border-slate-300/70 pl-4">
                        <a href="https://google.com" target="_blank" rel="noopener noreferrer" aria-label={tr("location")} className="p-2 rounded-xl text-slate-600 hover:text-[#7A2434] bg-white/90 shadow-sm border border-slate-200/60 transition-all"><MapPin className="w-4 h-4" /></a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label={tr("facebook")} className="p-2 rounded-xl text-slate-600 hover:text-[#1877F2] bg-white/90 shadow-sm border border-slate-200/60 transition-all"><FaFacebook className="w-4 h-4" /></a>
                        <a href="https://t.me" target="_blank" rel="noopener noreferrer" aria-label={tr("telegram")} className="p-2 rounded-xl text-slate-600 hover:text-[#26A5E4] bg-white/90 shadow-sm border border-slate-200/60 transition-all"><FaTelegram className="w-4 h-4" /></a>
                    </div>
                </div>

                <button
                    onClick={toggleLanguage}
                    title={tr("changeLanguage")}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#D4AF6A]/50 bg-white hover:bg-[#FBF6EC] text-slate-800 transition-all text-xs font-bold shadow-sm active:scale-95"
                >
                    <Globe className="w-3.5 h-3.5 text-[#C8A04D]" />
                    {locale === "kh" ? (
                        <div className="flex items-center gap-1.5"><CountryFlag countryCode="kh" /> <span className="font-semibold text-xs">ខ្មែរ</span></div>
                    ) : (
                        <div className="flex items-center gap-1.5"><CountryFlag countryCode="gb" /> <span className="font-semibold text-xs">EN</span></div>
                    )}
                </button>
            </header>

            <nav className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E5D6AE]/40 shadow-[0_4px_20px_-10px_rgba(122,36,52,0.08)]">
                <div className="max-w-6xl mx-auto px-4">
                    <ul className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar py-3.5">
                        {!isLoading && categoryFood.map((cat) => {
                            const URLFriendlyName = encodeURIComponent(cat.name.replace(/\s+/g, "-"));
                            const targetHref = `#menu-food=${URLFriendlyName}`;
                            const isActive = currentHash === targetHref;

                            return (
                                <li key={cat.id} className="relative flex-shrink-0">
                                    <a
                                        href={targetHref}
                                        onClick={(e) => handleTabClick(e, targetHref, cat.id)}
                                        className={`block text-sm font-extrabold pb-1 transition-colors duration-200 relative normal-nums
                                            ${isActive ? "text-[#7A2434]" : "text-slate-500 hover:text-[#7A2434]"}`}
                                    >
                                        {cat.name}
                                        {isActive && (
                                            <span className="absolute bottom-[-14px] left-0 right-0 h-[3px] bg-gradient-to-r from-[#C8A04D] to-[#7A2434] rounded-full" />
                                        )}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;