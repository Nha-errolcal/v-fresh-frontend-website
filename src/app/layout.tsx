import { MasterLayout } from "@/layouts/MasterLayout";
import "./globals.scss";

export const metadata = {
  title: "V-Fresh | មុខម្ហូបឆ្ងាញ់ៗ និងអាហារស្រស់ៗក្នុងខេត្តសៀមរាប",
  description: "V-Fresh - ទស្សនាបញ្ជីមុខម្ហូបខ្មែរ និងអាហារស្រស់ៗ រសជាតិឆ្ងាញ់ពិសា គុណភាពខ្ពស់។ Discover premium authentic dishes and fresh culinary options online at V-Fresh Cambodia.",
  keywords: ["V-Fresh", "V Fresh", "Food Menu Cambodia", "ម្ហូបខ្មែរ", "អាហារស្រស់ៗ"],
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