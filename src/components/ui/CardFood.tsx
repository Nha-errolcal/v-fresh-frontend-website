'use client';

import { Utensils, ShoppingBag } from "lucide-react";

export interface FoodItem {
    id: number;
    foodName: string;
    sku: string;
    price: string;
    description: string;
    image: string;
    category: {
        id: number;
        name: string;
    };
}

interface CardFoodProps {
    food: FoodItem[];
    isLoading: boolean;
}

const CardFood = ({ food, isLoading }: CardFoodProps) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                    <div key={n} className="bg-[#FBF6EC] rounded-[20px] overflow-hidden animate-pulse border border-[#E5D6AE] shadow-sm p-4">
                        <div className="w-full aspect-[4/3] bg-[#EDE3CC] rounded-2xl" />
                        <div className="mt-4 space-y-3">
                            <div className="h-5 bg-[#EDE3CC] rounded w-2/3" />
                            <div className="h-4 bg-[#EDE3CC] rounded w-full" />
                            <div className="flex justify-between items-center pt-3">
                                <div className="h-6 bg-[#EDE3CC] rounded w-1/4" />
                                <div className="h-9 w-9 bg-[#EDE3CC] rounded-full" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!food || food.length === 0) {
        return (
            <div className="p-12 text-center bg-[#FBF6EC]/60 rounded-3xl border border-dashed border-[#D9C796]">
                <Utensils className="w-8 h-8 mx-auto text-[#C8A04D] mb-2" />
                <p className="text-sm font-medium text-[#9C8B66]">No dishes found in this category.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 px-2 sm:px-0">
            {food.map((item) => (
                <div
                    key={item.id}
                    className="group relative flex flex-col bg-[#FBF6EC] rounded-[20px] overflow-hidden border border-[#E5D6AE] shadow-[0_4px_18px_-6px_rgba(122,36,52,0.10)] hover:shadow-[0_18px_30px_-10px_rgba(200,160,77,0.35)] hover:border-[#D4AF6A] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                >
                    {/* Temple-roof gold accent strip */}
                    <div className="h-[5px] w-full bg-gradient-to-r from-[#C8A04D] via-[#7A2434] to-[#C8A04D]" />

                    <div className="p-3 sm:p-4 flex flex-col flex-1">
                        {/* Image Box */}
                        <div className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden bg-[#F3ECD8] flex-shrink-0">
                            <img
                                src={item.image}
                                alt={item.foodName}
                                className="w-full h-full object-contain bg-[#F3ECD8] group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                            />

                            {/* Hanging paper tag SKU badge */}
                            <div
                                className="absolute top-3 left-0 -rotate-3 bg-gradient-to-r from-[#7A2434] to-[#5C1B26] text-[#F3E3B8] text-[10px] font-black tracking-wider pl-3 pr-2.5 py-1 shadow-md"
                                style={{ clipPath: "polygon(0% 50%, 14% 0%, 100% 0%, 100% 100%, 14% 100%)" }}
                            >
                                {item.sku || 'ITEM'}
                            </div>
                        </div>

                        {/* Meta/Text Body Content */}
                        <div className="flex flex-col flex-1 pt-4 pb-1 px-1 justify-between">
                            <div>
                                <h3 className="font-extrabold text-base sm:text-lg text-[#2A2420] group-hover:text-[#7A2434] transition-colors duration-200 line-clamp-1">
                                    {item.foodName}
                                </h3>
                                <p className="text-xs sm:text-sm text-[#9C8B66] font-medium line-clamp-2 mt-1 leading-relaxed">
                                    {item.description || 'No description provided.'}
                                </p>
                            </div>

                            <div className="flex justify-between items-center pt-4 mt-3 border-t border-dashed border-[#E5D6AE]">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-[#A8895A] uppercase tracking-wider">Price</span>
                                    <span className="text-lg sm:text-xl font-black text-[#193fe5] tracking-tight">
                                        ${parseFloat(item.price).toFixed(2)}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    aria-label="Add to order"
                                    className="flex items-center justify-center w-10 h-10 rounded-full bg-[#193fe5] text-white shadow-[0_6px_14px_-4px_rgba(25,63,229,0.5)] hover:bg-[#142fb8] active:scale-95 transition-all duration-150"
                                >
                                    <ShoppingBag className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardFood;