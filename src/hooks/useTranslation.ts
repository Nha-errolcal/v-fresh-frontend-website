// hooks/useTranslation.ts
import kh from "@/lang/kh";
import { useLangStore } from "@/stores/useLangStore";
import { useEffect, useState } from "react";

type Namespace = keyof typeof kh;

export function useTranslation(namespace: Namespace) {
    const locale = useLangStore((state) => state.locale);
    const setLocale = useLangStore((state) => state.setLocale);
    const t = useLangStore((state) => state.t);

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const tr = (key: string): string => {
        if (!mounted) return "";
        return t(namespace, key);
    };

    return { tr, locale, setLocale, mounted };
}
