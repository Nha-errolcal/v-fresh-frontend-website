interface CountryFlagProps {
    countryCode: string;
    squared?: boolean;
}

export default function CountryFlag({ countryCode, squared = false }: CountryFlagProps) {
    const code = countryCode.toLowerCase();

    return (
        <span
            className={`fi fi-${code} ${squared ? "fis" : ""}`}
            aria-label={`${countryCode} flag`}
        />
    );
}
