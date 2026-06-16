'use client';

import { useEffect, useRef } from "react";
import { useFetchFood } from "@/stores/useFetchFood";
import CardFood from "./CardFood";

const ListCategoryActiveWithFood = () => {
    const list = useFetchFood((state) => state.list);
    const categoryFood = useFetchFood((state) => state.categoryFood);
    const isLoading = useFetchFood((state) => state.isLoading);

    const isClickScrolling = useRef(false);
    const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const groupedFood = categoryFood.map((category) => ({
        ...category,
        items: list.filter((food) => food.category?.id === category.id)
    })).filter(group => group.items.length > 0);

    useEffect(() => {
        const handleHashClickTrigger = () => {
            isClickScrolling.current = true;
            if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
            clickTimeoutRef.current = setTimeout(() => {
                isClickScrolling.current = false;
            }, 1200);
        };

        window.addEventListener("hashchange", handleHashClickTrigger);
        return () => {
            window.removeEventListener("hashchange", handleHashClickTrigger);
            if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
        };
    }, []);

    useEffect(() => {
        if (isLoading || groupedFood.length === 0) return;

        const observerOptions = {
            root: null,
            rootMargin: "-140px 0px -60% 0px",
            threshold: [0, 0.25]
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            if (isClickScrolling.current) return;

            if (window.scrollY < 80) {
                if (window.location.hash !== "" && window.location.hash !== "#") {
                    window.history.replaceState(null, "", "#");
                    window.dispatchEvent(new HashChangeEvent("hashchange"));
                }
                return;
            }

            const visibleEntry = entries.find((entry) => entry.isIntersecting);
            if (visibleEntry) {
                const categoryName = visibleEntry.target.getAttribute("data-category-name");
                if (categoryName) {
                    const URLFriendlyName = encodeURIComponent(categoryName.replace(/\s+/g, "-"));
                    const targetHash = `#menu-food=${URLFriendlyName}`;

                    if (window.location.hash !== targetHash) {
                        window.history.replaceState(null, "", targetHash);
                        window.dispatchEvent(new HashChangeEvent("hashchange"));
                    }
                }
            }
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        groupedFood.forEach((group) => {
            const element = document.getElementById(`menu-food-section-${group.id}`);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [isLoading, list, categoryFood, groupedFood]);

    if (isLoading) {
        return (
            <div className="max-w-5xl mx-auto py-12 px-4 text-center text-[#A8895A] font-medium animate-pulse">
                Assembling delicious details...
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-4 px-4 space-y-12 sm:space-y-16">
            {groupedFood.map((group) => (
                <div
                    key={group.id}
                    id={`menu-food-section-${group.id}`}
                    data-category-name={group.name}
                    className="scroll-mt-[150px] flex flex-col"
                >
                    {/* Category Header */}
                    <div className="pb-4 mb-2 flex items-baseline justify-between">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-black text-[#2A2420] tracking-tight flex items-center gap-2.5">
                                <span className="inline-block w-1.5 h-6 rounded-sm bg-gradient-to-b from-[#C8A04D] to-[#7A2434]" />
                                {group.name}
                                <span className="text-xs font-black text-[#7A2434] bg-[#F3E3B8] border border-[#D4AF6A]/60 px-2.5 py-0.5 rounded-full">
                                    {group.items.length}
                                </span>
                            </h2>
                            {group.description && (
                                <p className="text-xs sm:text-sm text-[#9C8B66] font-normal mt-1.5 max-w-xl">
                                    {group.description}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="h-[2px] w-full bg-gradient-to-r from-[#C8A04D] via-[#E5D6AE] to-transparent mb-6" />

                    {/* Render Food Cards */}
                    <CardFood food={group.items} isLoading={false} />
                </div>
            ))}
        </div>
    );
};

export default ListCategoryActiveWithFood;