import { MasterLayout } from "@/layouts/MasterLayout";
<<<<<<< HEAD
import { Kantumruy_Pro, Poppins } from "next/font/google";
import "./globals.scss";

const kantumruyPro = Kantumruy_Pro({
  subsets: ["khmer"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-kantumruy",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "V-Fresh | មុខម្ហូបឆ្ងាញ់ៗ និងអាហារស្រស់ៗក្នុងខេត្តសៀមរាប",
  description:
    "V-Fresh - ទស្សនាបញ្ជីមុខម្ហូបខ្មែរ និងអាហារស្រស់ៗ រសជាតិឆ្ងាញ់ពិសា គុណភាពខ្ពស់។ Discover premium authentic dishes and fresh culinary options online at V-Fresh Cambodia.",
  keywords: [
    "V-Fresh",
    "V Fresh",
    "Food Menu Cambodia",
    "ម្ហូបខ្មែរ",
    "អាហារស្រស់ៗ",
  ],
=======
import "./globals.scss";

export const metadata = {
  title: "V-Fresh | មុខម្ហូបឆ្ងាញ់ៗ និងអាហារស្រស់ៗក្នុងខេត្តសៀមរាប",
  description: "V-Fresh - ទស្សនាបញ្ជីមុខម្ហូបខ្មែរ និងអាហារស្រស់ៗ រសជាតិឆ្ងាញ់ពិសា គុណភាពខ្ពស់។ Discover premium authentic dishes and fresh culinary options online at V-Fresh Cambodia.",
  keywords: ["V-Fresh", "V Fresh", "Food Menu Cambodia", "ម្ហូបខ្មែរ", "អាហារស្រស់ៗ"],
>>>>>>> da85ece325a714d6fba493dd8c06d6088981ed11
  icons: {
    icon: "../assets/logo.png",
    shortcut: "../assets/logo.png",
    apple: "../assets/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< HEAD
    <html lang="km" className={`h-full antialiased scroll-smooth ${kantumruyPro.variable} ${poppins.variable}`}>
      <body className="min-h-full flex flex-col bg-[#FAF8F5]">
        <MasterLayout>{children}</MasterLayout>
      </body>
    </html>
  );
}
=======
    // 'antialiased' ensures smooth rendering for Kantumruy Pro complex scripts
    <html lang="km" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#FAF8F5]">
        <MasterLayout>
          {children}
        </MasterLayout>
      </body>
    </html>
  );
}
>>>>>>> da85ece325a714d6fba493dd8c06d6088981ed11
