'use client'

import Image from "next/image";
import logo from "@/assets/logo.png";
import { LucideIcon, MapPin } from "lucide-react";
import bgHeader from "@/assets/bg_nav.jpg";
import "flag-icons/css/flag-icons.min.css";
import CountryFlag from "../CountryFlag";
import { useTranslation } from "@/hooks/useTranslation";
import { FaFacebook } from "react-icons/fa";
import { BsTelegram } from "react-icons/bs";

export interface NavbarMenuItem {
    id: number
    route: string
    name: string
    icon?: LucideIcon
}

const Navbar = () => {
    const { locale, setLocale } = useTranslation("Navbar");

    const toggleLanguage = () => {
        setLocale(locale === "kh" ? "en" : "kh");
    };

    return (
        <div
            className="w-full flex rounded-none overflow-hidden items-center justify-between px-6 py-3 text-slate-900 backdrop-blur-md border-b border-slate-200/60 bg-cover bg-center bg-no-repeat shadow-sm"
            style={{
                backgroundImage: `linear-gradient(to right, rgba(230, 242, 255, 0.85), rgba(255, 255, 255, 0.75)), url(${bgHeader.src})`
            }}
        >
            <div className="flex items-center gap-6">
                <div className="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer">
                    <Image
                        src={logo}
                        width={50}
                        height={50}
                        alt="logo"
                        className="object-contain"
                    />
                </div>

                <div className="flex items-center gap-4 border-l border-slate-300/60 pl-6 text-slate-600">
                    {/* Location Pin */}
                    <a
                        href="https://google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full hover:bg-slate-800/5 hover:text-blue-600 transition-all duration-150"
                        title="Location"
                    >
                        <MapPin className="w-5 h-5" />
                    </a>

                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full hover:bg-slate-800/5 hover:text-[#1877F2] transition-all duration-150"
                        title="Facebook"
                    >
                        <FaFacebook className="w-5 h-5" />
                    </a>

                    <a
                        href="https://t.me"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full hover:bg-slate-800/5 hover:text-[#26A5E4] transition-all duration-150"
                        title="Telegram"
                    >
                        <BsTelegram className="w-5 h-5" />
                    </a>
                </div>
            </div>

            <div className="flex items-center select-none">
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-800/5 active:scale-95 border border-slate-200/40 bg-white/30 transition-all duration-150 text-sm shadow-sm"
                >
                    {locale === "kh" ? (
                        <>
                            <div className="text-lg leading-none shadow-sm rounded-sm overflow-hidden">
                                <CountryFlag countryCode="kh" />
                            </div>
                            <span className="font-semibold text-slate-700">ខ្មែរ</span>
                        </>
                    ) : (
                        <>
                            <div className="text-lg leading-none shadow-sm rounded-sm overflow-hidden">
                                <CountryFlag countryCode="gb" />
                            </div>
                            <span className="font-semibold text-slate-700">EN</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default Navbar;
