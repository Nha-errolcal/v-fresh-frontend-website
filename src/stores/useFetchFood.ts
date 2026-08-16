import { create } from "zustand";
import { publicApi } from "@/lib/api";

// Define strong types based on your API response JSON structure
export interface Category {
    id: number;
    userId: number;
    name: string;
    description: string;
    code: string;
    isActive: number;
    createdAt: string;
    updatedAt: string;
}

export interface FoodItem {
    id: number;
    foodName: string;
    sku: string;
    price: string;
    description: string;
    isAvailable: boolean;
    isActive: boolean;
    stockId: number | null;
    discountId: number | null;
    image: string;
    category: Category;
    createdBy: number;
}

interface FoodState {
    list: FoodItem[];
    categoryFood: Category[]; // Stores unique categories for filter tabs
    isLoading: boolean;
    error: string | null;
    listItemCategoryProduct: () => Promise<void>;
}

export const useFetchFood = create<FoodState>((set) => ({
    list: [],
    categoryFood: [],
    isLoading: false,
    error: null,

    listItemCategoryProduct: async () => {
        set({ isLoading: true, error: null });
        try {
            const res = await publicApi.GET("/food/get_to_website") as any;

            if (res && res.data) {
                const foodItems: FoodItem[] = res.data;

                const uniqueCategoriesMap = new Map<number, Category>();

                foodItems.forEach((item) => {
                    if (item.category && item.category.id) {
                        uniqueCategoriesMap.set(item.category.id, item.category);
                    }
                });

                const uniqueCategories = Array.from(uniqueCategoriesMap.values());

                set({
                    list: foodItems,
                    categoryFood: uniqueCategories,
                    isLoading: false
                });
            } else {
                set({ isLoading: false });
            }

        } catch (err: any) {
            set({
                error: err?.message || "Something went wrong",
                isLoading: false
            });
        }
    },
}));