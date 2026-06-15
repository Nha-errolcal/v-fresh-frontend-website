import en from '@/lang/en';
import kh from '@/lang/kh';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const translations = { kh, en } as const;
export type Locale = keyof typeof translations;

interface LangState {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (namespace: keyof typeof kh, key: string) => string;
}

export const useLangStore = create<LangState>()(
    persist(
        (set, get) => ({
            locale: 'kh', // Default language
            setLocale: (locale) => set({ locale }),
            t: (namespace, key) => {
                try {
                    const currentLocale = get().locale;
                    const dic = translations[currentLocale][namespace];
                    return (dic as any)[key] || key;
                } catch {
                    return key;
                }
            },
        }),
        {
            name: 'app-language',
        }
    )
);
