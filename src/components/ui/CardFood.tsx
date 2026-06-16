'use client';

import { Utensils, ShoppingBag } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export interface Category {
    id: number;
    name: string;
    description?: string;
}

export interface FoodItem {
    id: number;
    foodName: string;
    sku: string;
    price: string;
    description: string;
    image: string;
    category: Category;
}

interface CardFoodProps {
    food: FoodItem[];
    isLoading: boolean;
}

const CardFood = ({ food, isLoading }: CardFoodProps) => {
    const { tr } = useTranslation("CardFood");

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2 sm:px-0">
                {[1, 2, 3].map((n) => (
                    <div key={n} className="bg-[#FBF6EC] rounded-[24px] overflow-hidden animate-pulse border border-[#E5D6AE] p-4 space-y-4">
                        <div className="w-full aspect-[4/3] bg-[#EDE3CC] rounded-2xl" />
                        <div className="space-y-3 px-1">
                            <div className="h-5 bg-[#EDE3CC] rounded w-2/3" />
                            <div className="h-4 bg-[#EDE3CC] rounded w-full" />
                            <div className="flex justify-between items-center pt-2">
                                <div className="h-6 bg-[#EDE3CC] rounded w-1/4" />
                                <div className="h-10 w-10 bg-[#EDE3CC] rounded-full" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!food || food.length === 0) {
        return (
            <div className="p-16 text-center bg-[#FBF6EC]/50 rounded-3xl border-2 border-dashed border-[#D9C796]/60 max-w-md mx-auto my-6">
                <Utensils className="w-10 h-10 mx-auto text-[#C8A04D] mb-3 stroke-[1.5]" />
                <p className="text-sm font-semibold text-[#9C8B66] tracking-wide">{tr("noDishes")}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2 sm:px-0">
            {food.map((item) => (
                <article
                    key={item.id}
                    className="group relative flex flex-col bg-[#FBF6EC] rounded-[24px] overflow-hidden border border-[#E5D6AE]/70 shadow-[0_4px_20px_-8px_rgba(122,36,52,0.06)] hover:shadow-[0_20px_35px_-12px_rgba(200,160,77,0.28)] hover:border-[#C8A04D] transition-all duration-300 transform hover:-translate-y-1.5"
                >
                    <div className="h-[4px] w-full bg-gradient-to-r from-[#C8A04D] via-[#7A2434] to-[#C8A04D]" />

                    <div className="p-4 flex flex-col flex-1">
                        <div className="relative w-full aspect-[4/3] rounded-[18px] overflow-hidden bg-[#F3ECD8] flex-shrink-0 shadow-inner">
                            <img
                                src={item.image || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100' height='100' fill='%23F3ECD8'/></svg>"}
                                alt={`${item.foodName} - Authentic Cuisine V-Fresh`}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                            />

                            {/* <div
                                className="absolute top-3 left-0 -rotate-1 bg-gradient-to-r from-[#7A2434] to-[#5C1B26] text-[#F3E3B8] text-[10px] font-black tracking-widest pl-3.5 pr-3 py-1 shadow-md"
                                style={{ clipPath: "polygon(0% 100%, 0% 0%, 100% 0%, 90% 50%, 100% 100%)" }}
                            >
                                {item.sku || 'FRESH'}
                            </div> */}
                        </div>

                        <div className="flex flex-col flex-1 pt-4 justify-between">
                            <div>
                                <h3 className="font-extrabold text-base sm:text-lg text-[#2A2420] group-hover:text-[#7A2434] transition-colors duration-200 line-clamp-1 tracking-tight">
                                    {item.foodName}
                                </h3>
                                <p className="text-xs sm:text-sm text-[#8A7955] font-medium line-clamp-2 mt-1.5 leading-relaxed min-h-[40px]">
                                    {item.description || tr("noDescription")}
                                </p>
                            </div>

                            <div className="flex justify-between items-center pt-4 mt-3 border-t border-dashed border-[#E5D6AE]">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-[#A8895A] uppercase tracking-wider">{tr("price")}</span>
                                    <span className="text-lg sm:text-xl font-black text-[#7A2434] tracking-tight">
                                        ${parseFloat(item.price).toFixed(2)}
                                    </span>
                                </div>
                                {/* <button
                                    type="button"
                                    aria-label={tr("addToOrder")}
                                    className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#7A2434] to-[#5C1B26] text-[#F3E3B8] shadow-md hover:shadow-lg hover:brightness-110 active:scale-95 transition-all duration-200"
                                >
                                    <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                                </button> */}
                            </div>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default CardFood;